'use client';
import styles from './MailerLiteForm.module.css';
import {useEffect, useState} from 'react';


export const MailerLiteForm = () => {
    useEffect(() => {
        initializeMailerLite();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className="ml-embedded" data-form="zGXnvS"></div>
            </div>
        </div>
    );
}

declare global {
    interface Window {
        MailerLiteObject?: string;
        ml?: {
            q?: any[];
            (...args: any[]): void;
        };
    }
}

function initializeMailerLite() {
    const w = window;
    const d = document;
    const e = 'script';
    const u = 'https://assets.mailerlite.com/js/universal.js';
    const f = 'ml';
    (w as any)[f] = (w as any)[f] || function () {
        ((w as any)[f].q = (w as any)[f].q || []).push(arguments);
    };
    const l = d.createElement(e);
    l.async = true;
    l.src = u;
    const n = d.getElementsByTagName(e)[0];
    n.parentNode?.insertBefore(l, n);
    (w as any).ml('account', '18505');
}
