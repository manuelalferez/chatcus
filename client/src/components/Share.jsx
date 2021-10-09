import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const SHARE_OPTIONS = [
  {
    type: 'LinkedIn',
    url: (url, text) =>
      `https://www.linkedin.com/shareArticle?mini=true&title=${text}&source=Chatcus&url=${url}`,
  },
  {
    type: 'Facebook',
    url: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
  {
    type: 'Twitter',
    url: (url, text) => `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
  },
  {
    type: 'Reddit',
    url: (url, text) => `https://www.reddit.com/submit?title=${text}&url=${url}`,
  },
];

export const ShareButton = ({ link, text }) => {
  const [dropdownState, setDropdownState] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const shareViaNavigator = () => {
    if (navigator.share) {
      navigator
        .share({
          title: text,
          url: link,
        })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(console.error);
    }
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setLinkCopied(true);
    });
  };
  useEffect(() => {
    if (!dropdownState) setLinkCopied(false);
  }, [dropdownState]);
  return (
    <React.Fragment>
      <div className="relative inline-block overflow-y-hidden text-left">
        <div className="flex">
          <button
            type="button"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setDropdownState(!dropdownState)}
            className="z-10">
            <svg
              className="w-5 h-5 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="30px"
              height="30px">
              <path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z" />
            </svg>
          </button>
        </div>

        <motion.div
          initial={{ scale: 0, opacity: 0, x: '-70%' }}
          animate={dropdownState ? { scale: 1, x: 0, opacity: 1 } : {}}
          className={`origin-top-right fixed mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 `}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}>
          <div className="py-1" role="none">
            <button
              type="button"
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 text-gray-900 hover:bg-gray-100"
              role="menuitem"
              tabIndex={dropdownState ? 0 : -1}
              id="menu-item-0"
              onClick={copyToClipboard}>
              {linkCopied ? 'Copied to Clipboard' : 'Copy Link'}
            </button>
            {SHARE_OPTIONS.map((option, i) => (
              <a
                key={option.type}
                href={option.url(encodeURIComponent(link), text)}
                className="block px-4 py-2 text-sm text-gray-700 text-gray-900 hover:bg-gray-100"
                role="menuitem"
                tabIndex={dropdownState ? 0 : -1}
                id={`menu-item-${i + 1}`}
                target="_blank"
                rel="noreferrer">
                Share to {option.type}
              </a>
            ))}
            <button
              type="button"
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 text-gray-900 hover:bg-gray-100"
              role="menuitem"
              tabIndex={dropdownState ? 0 : -1}
              id="menu-item-5"
              onClick={shareViaNavigator}>
              Share Post Via...
            </button>
          </div>
        </motion.div>
      </div>
      <div
        style={{ zIndex: dropdownState ? '1' : '-1' }}
        onClick={() => setDropdownState(false)}
        className="fixed top-0 left-0 w-full h-full"></div>
    </React.Fragment>
  );
};
