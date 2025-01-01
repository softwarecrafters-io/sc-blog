'use client'
import styles from './CallToAction.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltRight} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {MailerLiteForm} from "@/app/(no-header)/curso-principios/components/MailerLiteForm";


export const CallToAction = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const enableScroll = () => {
        document.body.style.overflow = 'visible';
    };
    const disableScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    useEffect(() => {
        isModalOpen ? disableScroll() : enableScroll();
    }, [isModalOpen]);

    if(!isModalOpen) {
        return (
            <button className={styles.callToAction} onClick={openModal}>
                Quiero leer la primera lección <b>ya</b> <FontAwesomeIcon className={styles.callToActionIcon} icon={faLongArrowAltRight} size="1x"/> </button>
        )
    }

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <button className={styles.closeButton} onClick={closeModal}>
                    <div className={styles.closeButtonItemOpen} data-position="top"></div>
                    <div className={styles.closeButtonItemOpen} data-position="top"></div>
                </button>
                <MailerLiteForm/>
            </div>
        </div>
    )
}

