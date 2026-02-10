import React, { useState, useEffect } from 'react';

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleToast = (event) => {
            const { message, type, id } = event.detail;
            setToasts((prev) => [...prev, { message, type, id }]);

            // Auto-remove after 3 seconds
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 3500);
        };

        window.addEventListener('custom-toast', handleToast);
        return () => window.removeEventListener('custom-toast', handleToast);
    }, []);

    return (
        <div className="toast-container">
            {toasts.map((t) => (
                <div key={t.id} className={`toast-card toast-${t.type}`}>
                    <div className="toast-content">
                        {t.type === 'success' && <span className="toast-icon">✓</span>}
                        {t.type === 'error' && <span className="toast-icon">✕</span>}
                        <span className="toast-message">{t.message}</span>
                    </div>
                    <div className="toast-progress"></div>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
