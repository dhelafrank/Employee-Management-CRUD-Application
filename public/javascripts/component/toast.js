export function toast(message, bgColor, callback) {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: bgColor,
        },
        onClick: callback || function () {}
    }).showToast();
}