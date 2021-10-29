const checkNotificationSupport = () => typeof Notification === 'undefined';

export const requestPermission = () => {
  if (checkNotificationSupport()) return;
  Notification.requestPermission();
};

export const showNotification = (message) => {
  if (checkNotificationSupport()) return;
  if (document.visibilityState === 'hidden' && Notification.permission === 'granted') {
    try {
      const notification = new Notification(`${message.user?.toUpperCase()} just send a message`, {
        body: message.text,
        icon: message.pfpSrc,
      });
      notification.onclick = () => {
        window.parent.focus();
        notification.close();
      };
    } catch (error) {
      //
    }
  }
};
