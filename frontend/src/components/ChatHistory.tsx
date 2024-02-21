import React from "react"
import { NavLink } from "react-router-dom"
import "../style/chats.css"

export default function ChatHistory({threadId, title}) {
    return (
        
            <NavLink to={`/chats/${threadId}`} className={({isActive}) => isActive ? "active" : ""}>
               <div className="thread-log">{title}</div> 
            </NavLink>
    )
}
