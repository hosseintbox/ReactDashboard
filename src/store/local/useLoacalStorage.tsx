import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error("Error reading localStorage", error);
            return defaultValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error writing to localStorage", error);
        }
    };

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key) {
                try {
                    const newValue = event.newValue ? JSON.parse(event.newValue) : defaultValue;
                    setStoredValue(newValue);
                } catch (error) {
                    console.error("Error parsing storage value", error);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [key, defaultValue]);

    return [storedValue, setValue];
}

export default useLocalStorage;
