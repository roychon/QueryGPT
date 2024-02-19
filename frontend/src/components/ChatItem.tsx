import React from "react"
import "../style/chatitem.css"
import { PiFinnTheHuman } from "react-icons/pi";
import { LiaRobotSolid } from "react-icons/lia";

export default function ChatItem({text, role}) {
    return (
        <div className={`chat-item ${role}`}>
            {role == "User" ? <PiFinnTheHuman /> : <LiaRobotSolid /> }
            <p >{text}</p>
        </div>
    )
}