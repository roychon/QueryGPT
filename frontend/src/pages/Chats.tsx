import React, { useRef, useState } from "react"
import axios from "../helpers/axios"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"
import "../style/chats.css"
import Icon from "../components/Icons"




export default function Chats() {
    // const [enteredMessage, setEnteredMessage] = useState(false)
    const auth = useAuth()
    const navigate = useNavigate()
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [prompt, setPrompt] = useState("")
    // const [threadId, setThreadId] = useState<String | null>(null)
    // const [conversationPairs, setConversationPairs] = useState<ConversationPair[] | null>(null)

    const createThread = async (e) => {
        e.preventDefault()
        const {data:thread} = await axios.post("/chat/thread")
        console.log(thread.thread._id)
        navigate(`./${thread.thread._id}`)
        setPrompt("")
       
    }

    
    const handleLogOut = async () => {
        try {
            const logout = await auth?.logout()
            navigate("/")
        } catch (e) {
            console.log(e.message)
        }
    }


    return (
        <section id="chats-container">
            <section id="sidebar">
                <p>Sidebar</p>
            </section>
            <section id="messages">
                <div id="messages-content">
                    <>
                        <img src="../public/appLogo.png" alt="VirtuAI Logo" />
                        <h1>VirtuAI</h1>
                        <p style={{marginTop: "10px"}}>Delve into profound perspectives, participate in enriching dialogues, and discover fresh opportunities with VirtuAI.</p>
                    </>
                </div>
                <div id="input-box">
                    <form onSubmit={createThread}>
                        <input ref={inputRef} type="text" placeholder="Enter prompt here..." onChange={e => setPrompt(e.target.value)} value={prompt}/>
                        <Icon text="Audio" />
                        <Icon text="File" />
                    </form>
                </div>
            </section>
        </section>
    )
}
