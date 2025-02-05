import React, { createContext, useContext, useState, useEffect } from 'react';

interface DarkModeContextType { darkMode: boolean; toggleDarkMode: () => void;}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark');

useEffect(() => {
    if (darkMode) {document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}, [darkMode]);

const toggleDarkMode = () => {setDarkMode(!darkMode);};

return (<DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
    {children}</DarkModeContext.Provider>);
}

export function useDarkMode() {const context = useContext(DarkModeContext);
    if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');} return context;}