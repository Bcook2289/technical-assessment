"use client";

import React, { createContext, useContext, useState, useCallback } from "react"; 
import { getCurrentUser, deleteUser, logoutUser, loginUser, registerUser } from "../lib/auth";

type User = {
    email: string;
    password: string;
}

type AuthContextType = {
    user: User | null;
    loading: boolean;
    checkAuth: () => Promise<User | null>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    deleteCurrentUser: (email:string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType> ({
    user: null,
    loading: true,
    checkAuth: async () => null,
    login: async () => {},
    logout: async () => {},
    register: async () => {},
    deleteCurrentUser: async () => {}
})

export const AuthProvider = ({ children }:{ children:React.ReactNode }) => {
    const [ user, setUser ] = useState<null | User>(null);
    const [ loading, setLoading ] = useState(true);

    const checkAuth = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getCurrentUser();
            setUser(data.user);
            return data.user;
        } catch (error) {
            console.error("Authorization failed", error);
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await loginUser(email, password);
            if(response?.user) {
                setUser(response.user);
                return;
            }
            await checkAuth();
        } catch(error) {
            throw error;
        }
    }

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            throw error;
        }
    }

    const register = async (email: string, password: string) => {
        try {
            await registerUser(email, password);
            alert("User Created");
        } catch (error) {
            throw error;
        }
    }

    const deleteCurrentUser = async () =>{
        try {
            await deleteUser();
            setUser(null);
            alert("User Deleted");
        } catch(error) {
            throw error;
        }
    }

    return (
        <AuthContext.Provider value = {{user, loading, checkAuth, login, logout, register, deleteCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);