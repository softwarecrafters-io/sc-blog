'use client';
import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/solid";
import styles from './themeSwitcher.module.css';

export type Theme = 'light' | 'dark' ;

export const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const storedTheme = window.localStorage.getItem('theme') as Theme;
        const defaultTheme = storedTheme || 'light'
        setTheme(defaultTheme);
        document.documentElement.setAttribute('data-theme', defaultTheme);
    }, []);

    const setDarkTheme = () =>{
        setTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('theme', 'dark');
    }

    const setLightTheme = () => {
        setTheme('light');
        document.documentElement.setAttribute('data-theme', 'light');
        window.localStorage.setItem('theme', 'light');
    }

    return (
        <div className={styles.themeToggleContainer}>
            {
                theme === 'light'
                    ? <SunIcon className={styles.sun} onClick={setDarkTheme} />
                    : <MoonIcon className={styles.moon} onClick={setLightTheme}/>
            }
        </div>
    );
};
