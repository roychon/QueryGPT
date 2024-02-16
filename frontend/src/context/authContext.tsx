import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, signupUser } from "../helpers/api-fetcher";

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

    // initial authCheck if cookies
    useEffect(() => {
        const initialAuthCheck = async () => {
            try {
                const res = await checkAuthStatus()
                setUser({username: res.username, password: res.password})
                setIsLoggedIn(true)
                console.log("In authContext.tsx: cookies successfully verified")
            } catch (e) {
                console.log(e.message)
            }
        }
        initialAuthCheck()
    }, [])

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
