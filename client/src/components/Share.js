import React, { useState, useEffect } from "react";
import { Dropdown } from "./atoms/Dropdown";

const SHARE_OPTIONS = [
  {
    type: "LinkedIn",
    path: "M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z",
    url: (url, text) =>
      `https://www.linkedin.com/shareArticle?mini=true&title=${text}&source=Chatcus&url=${url}`,
  },
  {
    type: "Facebook",
    path: "M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z",
    url: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
  {
    type: "Twitter",
    path: "M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z",
    url: (url, text) =>
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
  },
  {
    type: "Reddit",
    path: "M 29 3 C 26.896 3 24.427687 4.636625 24.054688 12.015625 C 24.368687 12.007625 24.682 12 25 12 C 25.353 12 25.701781 12.007578 26.050781 12.017578 C 26.288781 7.5845781 27.354 5 29 5 C 29.703 5 30.091938 5.3873594 30.835938 6.1933594 C 31.702938 7.1333594 32.843547 8.3378281 35.060547 8.7988281 C 35.024547 8.5368281 35 8.271 35 8 C 35 7.578 35.045906 7.1665312 35.128906 6.7695312 C 33.753906 6.3935312 33.015688 5.6088906 32.304688 4.8378906 C 31.510687 3.9768906 30.61 3 29 3 z M 41 4 C 38.794 4 37 5.795 37 8 C 37 10.205 38.794 12 41 12 C 43.206 12 45 10.205 45 8 C 45 5.795 43.206 4 41 4 z M 25 14 C 12.869 14 3 20.178 3 29 C 3 37.822 12.869 45 25 45 C 37.131 45 47 37.822 47 29 C 47 20.178 37.131 14 25 14 z M 7.5 14.949219 C 6.04 14.949219 4.65275 15.53375 3.59375 16.59375 C 1.87175 18.31575 1.5247656 20.797656 2.5097656 22.847656 C 4.0197656 19.920656 6.5990781 17.423453 9.9550781 15.564453 C 9.1930781 15.177453 8.365 14.949219 7.5 14.949219 z M 42.5 14.949219 C 41.635 14.949219 40.805922 15.177453 40.044922 15.564453 C 43.399922 17.423453 45.980234 19.920656 47.490234 22.847656 C 48.475234 20.796656 48.12825 18.31575 46.40625 16.59375 C 45.34625 15.53375 43.96 14.949219 42.5 14.949219 z M 17 23 C 18.657 23 20 24.343 20 26 C 20 27.656 18.657 29 17 29 C 15.343 29 14 27.656 14 26 C 14 24.343 15.343 23 17 23 z M 33 23 C 34.656 23 36 24.343 36 26 C 36 27.656 34.656 29 33 29 C 31.344 29 30 27.656 30 26 C 30 24.343 31.344 23 33 23 z M 16.070312 34.013672 C 16.321562 34.057047 16.557297 34.195922 16.716797 34.419922 C 16.823797 34.568922 19.167 37.699219 25 37.699219 C 30.912 37.699219 33.25925 34.458781 33.28125 34.425781 C 33.59725 33.974781 34.223781 33.862641 34.675781 34.181641 C 35.126781 34.498641 35.234969 35.122219 34.917969 35.574219 C 34.799969 35.742219 31.939 39.699219 25 39.699219 C 18.06 39.699219 15.200031 35.742219 15.082031 35.574219 C 14.765031 35.122219 14.874172 34.499641 15.326172 34.181641 C 15.551672 34.023141 15.819063 33.970297 16.070312 34.013672 z",
    url: (url, text) =>
      `https://www.reddit.com/submit?title=${text}&url=${url}`,
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
          console.log("Thanks for sharing!");
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
  const getDropdownData = () => ({
    label: (
      <svg
        className="ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        width="30px"
        height="30px"
      >
        <path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z" />
      </svg>
    ),
    menu: (
      <div className="py-1" role="none">
        <button
          type="button"
          className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 text-gray-900"
          role="menuitem"
          tabIndex={dropdownState ? 0 : -1}
          id="menu-item-0"
          onClick={copyToClipboard}
        >
          {linkCopied ? "Copied to Clipboard" : "Copy Link"}
        </button>
        {SHARE_OPTIONS.map((option, i) => (
          <a
            key={option.type}
            href={option.url(encodeURIComponent(link), text)}
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 text-gray-900"
            role="menuitem"
            tabIndex={dropdownState ? 0 : -1}
            id={`menu-item-${i + 1}`}
            target="_blank"
          >
            Share to {option.type}
          </a>
        ))}
        <button
          type="button"
          className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-gray-900"
          role="menuitem"
          tabIndex={dropdownState ? 0 : -1}
          id="menu-item-5"
          onClick={shareViaNavigator}
        >
          <div className="py-1" role="none">
            <button
              type="button"
              className="text-gray-700 block px-4 py-2 text-sm w-full text-center hover:bg-gray-100 text-gray-900"
              role="menuitem"
              tabIndex={dropdownState ? 0 : -1}
              id="menu-item-0"
              onClick={copyToClipboard}
            >
              {linkCopied ? "Copied to Clipboard" : "Copy Link"}
            </button>
            {SHARE_OPTIONS.map((option, i) => (
              <a
                key={option.type}
                href={option.url(encodeURIComponent(link), text)}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 text-gray-900 flex justify-center"
                role="menuitem"
                tabIndex={dropdownState ? 0 : -1}
                id={`menu-item-${i + 1}`}
                target="_blank"
              >
                <span>
                  Share to {option.type} {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 50 50"
                    style={{fill: "#000000" }}
                    className="inline-block"
                  >    
                    <path d={`${option.path}`} />
                  </svg>
                </span>
              </a>
            ))}
            <button
              type="button"
              className="text-gray-700 block w-full text-center px-4 py-2 text-sm hover:bg-gray-100 text-gray-900"
              role="menuitem"
              tabIndex={dropdownState ? 0 : -1}
              id="menu-item-5"
              onClick={shareViaNavigator}
            >
              Share Post Via...
            </button>
          </div>
        </motion.div>
      </div>
    ),
    showDropdown: dropdownState,
  });

  const getDropdownActions = () => ({
    menuClick: () => setDropdownState(!dropdownState),
    backdropClick: () => setDropdownState(false),
  });

  return <Dropdown data={getDropdownData()} actions={getDropdownActions()} />;
};
