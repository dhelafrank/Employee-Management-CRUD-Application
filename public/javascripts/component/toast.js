const toastColors = {
  danger: '#d9534f',
  success: '#5cb85c',
  warning: '#f0ad4e',
  info: '#5bc0de',
  faded: '#f7f7f7',
  inverse: '#292b2c',
};

export function toast(message, backgroundColor, callback) {
  if (!toastColors.hasOwnProperty(backgroundColor)) {
    console.error('Invalid background color provided. Using default.');
    backgroundColor = 'faded'; // Use a default color
  }

  callback = typeof callback === 'function' ? callback : () => {};

  Toastify({
    text: message,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: toastColors[backgroundColor],
    },
    onClick: callback,
  }).showToast();
}
