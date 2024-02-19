import React from "react"
import { NavLink } from "react-router-dom"
import "../style/chats.css"

export default function ChatHistory({threadId, title}) {
    return (
        <div className="thread-log">
            <NavLink to={`/chats/${threadId}`} className={({isActive}) => isActive ? "active" : ""}>
                {title}
            </NavLink>
        </div>
    )
}
