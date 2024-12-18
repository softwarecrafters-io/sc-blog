'use client'

import { useState, useEffect } from 'react'
import styles from './CookiesConsent.module.css'

export function CookiesConsent() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const hasAcceptedCookies = localStorage.getItem('cookiesAccepted')
        if (!hasAcceptedCookies) {
            setIsVisible(true)
        }
    }, [])

    const acceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className={styles.cookiesBar}>
            <p className={styles.text}>
                Utilizamos cookies propias y de terceros para mejorar nuestros servicios.
            </p>
            <button onClick={acceptCookies} className={styles.button}>
                Aceptar
            </button>
        </div>
    )
}
