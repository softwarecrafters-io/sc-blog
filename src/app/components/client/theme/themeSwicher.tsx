'use client';
import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/solid";
import styles from './themeSwitcher.module.css';
import {ClientFactory} from "@/infrastructure/factories/clientFactory";

export type Theme = 'light' | 'dark' ;

export const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('light');
    const themeStore = ClientFactory.getThemeStore();
    const updateTheme = (theme: Theme) => {
        setTheme(theme);
        themeStore.updateTheme(theme)
    }

    useEffect(() => {
        const storedTheme = window.localStorage.getItem('theme') as Theme;
        const defaultTheme = storedTheme || 'dark'
        updateTheme(defaultTheme);
        document.documentElement.setAttribute('data-theme', defaultTheme);
    }, []);

    const setDarkTheme = () =>{
        updateTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('theme', 'dark');
    }

    const setLightTheme = () => {
        updateTheme('light');
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
