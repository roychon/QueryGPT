import React from "react"
import { CiEdit } from "react-icons/ci"

export default function AddChatButton({handleClick}: {handleClick: () => void}) {
    return (
        <div id="new-thread-btn" onClick={handleClick}>
            <img src="../public/appLogo.png" alt="VirtuAI logo" />
            <p>New Chat</p>
            <p className="edit-icon">
                <CiEdit size='25px'/>
            </p>
        </div>
    )
}
