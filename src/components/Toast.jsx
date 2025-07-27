import React, { useState, useEffect } from 'react';
import './Toast.css';

export default function Message({ text, type }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 3000); 

        return () => clearTimeout(timer); 
    }, []);

    if (!text || !show) return null;

    const messageClass = type === 'success' ? 'success-message' : 'error-message';

    return (
        <div className={`message ${messageClass}`}>
            {text}
        </div>
    );
}