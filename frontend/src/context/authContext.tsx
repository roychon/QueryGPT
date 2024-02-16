import React, { ReactNode, createContext, useContext, useState } from "react";
import { loginUser, signupUser } from "../helpers/api-fetcher";

type User = {
    username: String,
    password: String,
}

type UserAuth = {
    user: User | null,
    isLoggedIn: boolean,
    signup: (username: String, password: String) => Promise<void>,
    login: (username: String, password: String) => Promise<void>
}

// create type for context
const AuthContext = createContext<UserAuth | null>(null)

export function AuthProvider({children} :{ children: ReactNode}) {
    // have isLoggedIn, user object, and functions 
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const signup = async (username: String, password: String) => {
        try {
            const user = await signupUser(username, password)
            setUser({username, password})
            setIsLoggedIn(true)
        } catch (e) {
            throw new Error(e.message)
        }
    }

    const login = async (username: String, password: String) => {
        try {
            const data = await loginUser(username, password)
            console.log(data.username, data.password)
            setUser({username: data.username, password: data.password})
            setIsLoggedIn(true)
        } catch (e) {
            throw new Error(e.message)
        }
    }

    const value = {
        user,
        isLoggedIn,
        signup,
        login
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
