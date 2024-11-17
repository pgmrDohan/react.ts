import { useState, useEffect } from 'react';

export const useDarkMode = () => {
    const [theme, setTheme] = useState(() => {
        const isUserColorTheme = localStorage.getItem('data-theme');
        const isOsColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        return isUserColorTheme || isOsColorTheme;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('data-theme', theme);
    }, [theme]);

    const applyTheme = () => {
        setTheme(theme === 'dark' ? 'dark' : 'light');
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return {
        isDarkMode: theme === 'dark',
        applyTheme,
        toggleTheme
    };
};