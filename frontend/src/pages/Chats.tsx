import React from "react"
import axios from "../helpers/axios"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"

export default function Chats() {
    const auth = useAuth()
    const navigate = useNavigate()
    
    const handleLogOut = async () => {
        try {
            const logout = await auth?.logout()
            navigate("/")
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <>
            <p>Chats</p>
            <button onClick={handleLogOut}>Logout</button>
        </>
    )
}
