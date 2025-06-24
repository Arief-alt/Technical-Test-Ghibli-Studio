'use client'

import { useEffect } from 'react';

const SparkleCursor = () => {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${e.pageX}px`;
            sparkle.style.top = `${e.pageY}px`;
            document.body.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return null;
};

export default SparkleCursor;