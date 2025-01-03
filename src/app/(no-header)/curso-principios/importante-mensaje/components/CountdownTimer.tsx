'use client'
import { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';

interface CountdownTimerProps {
    expiryTime: number;
    onExpire: () => void;
}

export function CountdownTimer({ expiryTime, onExpire }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft());

    function calculateTimeLeft(): number {
        return Math.max(0, expiryTime - Date.now());
    }

    useEffect(() => {
        if (timeLeft === 0) {
            onExpire();
            return;
        }

        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            if (newTimeLeft === 0) {
                onExpire();
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, expiryTime, onExpire]);

    const minutes = Math.floor(timeLeft / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <div className={styles.countdown}>
            <span className={styles.time}>{minutes}:{seconds.toString().padStart(2, '0')}</span>
            <span className={styles.label}>minutos restantes</span>
        </div>
    );
}
