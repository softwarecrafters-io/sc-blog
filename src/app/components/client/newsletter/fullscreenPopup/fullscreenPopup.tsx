'use client';
import React, { useState, useEffect } from 'react';
import styles from './fullscreenPopup.module.css';
import {DownloadLeadMagnet} from "@/app/components/client/newsletter/downloadLeadMagnet";


export const FullscreenPopup = () => {
    const delay = 25000;
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const storageKey = 'popupLastClosed';
    const enableScroll = () => {
        document.body.style.overflow = 'visible';
    };

    const disableScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const setVisibleAfter = (delay: number) =>
        setTimeout(() => setIsVisible(true), delay);

    const checkPopupVisibility = (): void => {
        const lastClosed = localStorage.getItem(storageKey);
        if(!lastClosed){
            setVisibleAfter(delay);
        }
        const now = new Date().getTime();
        const aHour = 60 * 60 * 1000;
        const lastClosedParsed = parseInt(lastClosed as string, 10);
        const currentTime = now - lastClosedParsed
        if (currentTime > aHour) {
            setVisibleAfter(delay);
        }
    };

    const closePopup = (): void => {
        setIsVisible(false);
        localStorage.setItem(storageKey, new Date().getTime().toString());
    };

    useEffect(() => {
        checkPopupVisibility();
        isVisible ? disableScroll() : enableScroll();
        return enableScroll; // Cleanup function
    }, [isVisible, delay]);


    if (!isVisible) return <></>;

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <button className={styles.closeButton} onClick={closePopup}>
                    <div className={styles.closeButtonItemOpen} data-position="top"></div>
                    <div className={styles.closeButtonItemOpen} data-position="top"></div>
                </button>
                <DownloadLeadMagnet onClick={closePopup}/>
            </div>
        </div>
    );
};
