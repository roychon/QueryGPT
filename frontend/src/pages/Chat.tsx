import React, { useEffect, useRef, useState } from "react"
import axios from "../helpers/axios"
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"
import "../style/chats.css"
import Icon from "../components/Icons"
import { CiEdit } from "react-icons/ci";
import ChatHistory from "../components/ChatHistory"
import ConversationPair from "../components/ConversationPair"


export default function Chats() {
    const [threads, setThreads] = useState<any[]>([]) // set in side bar
    const [conversationPairs, setConversationPairs] = useState<any []>([])
    const [firstSubmit, setFirstSubmit] = useState<boolean>(true) // state on whether it is first submit or not

    const auth = useAuth()
    const navigate = useNavigate()

    const inputRef = useRef<HTMLInputElement | null>(null)
    const [prompt, setPrompt] = useState("")

    const handlePromptSubmit = async (e) => {
        e.preventDefault()
    
     
        const newThread = firstSubmit ?  await axios.post("/chat/thread") : null
        console.log("NEW THREAD: ", newThread)
        const threadId = newThread?.data.thread._id

        if (newThread) setThreads(prev => [newThread.data, ...prev])
        setPrompt("")
        console.log(newThread?.data.thread)

        // pass in prompt and get ai, set it in thread
        const res = await axios.post("/chat", {
            prompt, 
            threadId
        })
        const data  = await res.data
        const newConversationPair = {
            _id: data.conversationPairId,
            system: {
                role: "System",
                content: data.response.response
            },
            user: {
                role: "User",
                content: prompt
            }
        }

        setConversationPairs(prev => [...prev, newConversationPair])
       
    }
    
    const handleLogOut = async () => {
        try {
            const logout = await auth?.logout()
            navigate("/")
        } catch (e) {
            console.log(e.message)
        }
    }

    // TODO: make a separate useEffect hook for when threadId changes


    // initial fetch of user's threads
    useEffect(() => {
        const ref = inputRef.current!
        ref.focus()

        // initial fetch of threads
        async function getThreads() {
            const res = await axios.get("/chat/threads")
            const data = await res.data
            // console.log(data)
            setThreads(data.threads)
        }
        getThreads()
    }, [])


    return (
        <section id="chats-container">
            <section id="sidebar">
            <div id="new-thread-btn">
                    <img src="../public/appLogo.png" alt="VirtuAI logo" />
                    <p>New Chat</p>
                    <p className="edit-icon">
                    <CiEdit size='25px'/>
                    </p>
                </div>
                <div id="user-threads">
                    {threads?.map((thread, i) => (
                        <ChatHistory key={i} threadId={thread.id} title={thread.title} />
                    ))}
                </div>
            </section>
            <section id="messages">
                <div id="messages-content">
                    {
                        conversationPairs.length ? (
                            conversationPairs.map((pair) => (
                                <ConversationPair pair={pair} key={pair._id} />
                            ))
                        )
                        :
                            <>
                                <img src="../public/appLogo.png" alt="VirtuAI Logo" />
                                <h1>VirtuAI</h1>
                                <p style={{marginTop: "10px"}}>Delve into profound perspectives, participate in enriching dialogues, and discover fresh opportunities with VirtuAI.</p>
                            </>
                    }
                    
                </div>
                <div id="input-box">
                    <form onSubmit={handlePromptSubmit}>
                        <input ref={inputRef} type="text" placeholder="Enter prompt here..." onChange={e => setPrompt(e.target.value)} value={prompt}/>
                        <Icon text="Audio" />
                        <Icon text="File" />
                    </form>
                </div>
            </section>
        </section>
    )
}
