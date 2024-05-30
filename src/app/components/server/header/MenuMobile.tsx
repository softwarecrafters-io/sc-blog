'use client';
import {ReactNode, useEffect, useState} from "react";
import styles from './MenuMobile.module.css';
import Link from "next/link";
import {ThemeToggle} from "@/app/components/server/header/theme/themeSwicher";
export const MenuMobile = ({links}:{links:Record<string, string>}) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add(styles.noScroll);
        } else {
            document.body.classList.remove(styles.noScroll);
        }
        return () => {
            document.body.classList.remove(styles.noScroll);
        };
    }, [isOpen]);

    const renderLinks = Object.keys(links).map((key) =>
        <Link
            key={key}
            className={styles.menuLinkItem}
            target={links[key].startsWith('http') ? '_blank' : '_self'}
            href={links[key]}
            onClick={() => setTimeout(()=>setIsOpen(!isOpen),200) }>{key}</Link>);

    return (
        <div>
            <button className={styles.menuButton} onClick={ ()=>setIsOpen(!isOpen)}>
                <div className={isOpen ? styles.menuButtonItemOpen : styles.menuButtonItemClosed} data-position="top"></div>
                <div className={isOpen ? styles.menuButtonItemOpen : styles.menuButtonItemClosed} data-position="top"></div>
            </button>
            {isOpen && <div className={styles.menuLinkContainer}>
                {renderLinks}
                <div className={styles.menuLinkItem}>
                    <ThemeToggle/>
                </div>
            </div>}
        </div>
    )
}
