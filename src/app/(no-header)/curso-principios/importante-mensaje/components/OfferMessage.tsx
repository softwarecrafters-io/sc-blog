'use client'
import { useRouter } from 'next/navigation';
import { CountdownTimer } from './CountdownTimer';
import styles from '../styles.module.css';

interface OfferMessageProps {
    expiryTime: number;
}

export function OfferMessage({ expiryTime }: OfferMessageProps) {
    const router = useRouter();

    const handleExpire = () => {
        router.refresh();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Un mensaje importante</h1>
            <p className={styles.text}>
                Aprovecha este precio especial para comprar con un 30% de descuento Clean JavaScript
            </p>
            <CountdownTimer
                expiryTime={expiryTime}
                onExpire={handleExpire}
            />
            <p className={styles.text}>Esta oferta no se volverá a repetir</p>
            <a
                className={styles.checkoutButton}
                href="https://checkout.softwarecrafters.io/clean-javascript-welcome/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Comprar ahora
            </a>
        </div>
    );
}
