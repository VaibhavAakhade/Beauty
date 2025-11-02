import { jsx as _jsx } from "react/jsx-runtime";
// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from "../api/axiosConfig";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(false);
    // Check localStorage on app start
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setRole(parsedUser.role);
        }
    }, []);
    // Auto logout when window/tab is closed
    useEffect(() => {
        const handleUnload = () => {
            // perform same cleanup as logout — keep it sync-safe for unload
            try {
                // If you have a backend logout endpoint and want to notify it reliably,
                // consider using navigator.sendBeacon(url, payload) here.
            }
            catch (e) {
                // ignore errors during unload
            }
            setUser(null);
            setRole(null);
            localStorage.removeItem('user');
        };
        window.addEventListener('beforeunload', handleUnload);
        window.addEventListener('unload', handleUnload);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            window.removeEventListener('unload', handleUnload);
        };
    }, []);
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/auth/login', {
                usernameOrEmail: email,
                password: password,
            });
            const loggedUser = response.data.user;
            if (loggedUser) {
                setUser(loggedUser);
                setRole(loggedUser.role);
                localStorage.setItem('user', JSON.stringify(loggedUser));
            }
            else {
                throw new Error('Invalid response from server');
            }
        }
        finally {
            setLoading(false);
        }
    };
    const logout = () => {
        setUser(null);
        setRole(null);
        localStorage.removeItem('user');
    };
    return (_jsx(AuthContext.Provider, { value: { user, role, login, logout, loading }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within AuthProvider');
    return context;
};
