const toast = (message, type = 'info') => {
    const event = new CustomEvent('custom-toast', {
        detail: { message, type, id: Date.now() },
    });
    window.dispatchEvent(event);
};

export const toastUtils = {
    success: (msg) => toast(msg, 'success'),
    error: (msg) => toast(msg, 'error'),
    info: (msg) => toast(msg, 'info'),
    warning: (msg) => toast(msg, 'warning'),
};
