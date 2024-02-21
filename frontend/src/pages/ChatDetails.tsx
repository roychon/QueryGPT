// import React, { useEffect, useRef, useState } from "react"
// import { useParams } from "react-router-dom"
// import Icon from "../components/Icons"
// import axios from "../helpers/axios"
// import ConversationPair from "../components/ConversationPair"
// import { CiEdit } from "react-icons/ci";
// import ChatHistory from "../components/ChatHistory"

// // TODO: lazy load these chats

// // TODO: create type so it matches what is logged on console
// // type ConversationPairContent = {
// //     // Define the structure of a conversation pair
// //     _id: string,
// //     user: {
// //         content: string,
// //         role: string
// //     };
// //     system: {
// //         content: string,
// //         role: string
// //     };
// // }

// // type ConversationPair = {
// //     conversationPair: ConversationPairContent,
// //     _id: string
// // }


// export default function ChatDetails() {
//     const [threads, setThreads] = useState<any[] | null>(null)
//     const [conversationPairs, setConversationPairs] = useState<any[] | null>(null)
//     const [prompt, setPrompt] = useState("")
//     const {threadId} = useParams()
//     const inputRef = useRef<HTMLInputElement | null>(null)

//     useEffect(() => {
//         async function getThreads() {
//             const res = await axios.get("/chat/threads")
//             const data = await res.data
//             // console.log(data)
//             setThreads(data.threads)
//         }
//         getThreads()
//     }, [conversationPairs])

//     const handlePromptSubmit = async (e) => {
//         e.preventDefault()
//         const res = await axios.post("/chat", {
//             prompt, 
//             threadId
//         })
//         const data  = await res.data
//         const newConversationPair = {
//             _id: data.conversationPairId,
//             system: {
//                 role: "System",
//                 content: data.response.response
//             },
//             user: {
//                 role: "User",
//                 content: prompt
//             }
//         }
//         // console.log(data)
//         setPrompt("")
//         setConversationPairs(prev => prev ? [...prev, newConversationPair] : [newConversationPair])
//     }

//     useEffect(() => {
//         // fetch user chats from threadId and display them
//         const getThreadChats = async () => {
//             try {
//                 const res = await axios.post("/chat/getUserChats", {threadId})
//                 if (res.data) setConversationPairs(res.data)
//                 else setConversationPairs(null)
//             } catch (e) {
//                 console.log(e.message)
//             }
//         }
//         getThreadChats()
//     }, [threadId])

//     return (
//         <section id="chats-container">
//             <section id="sidebar">
//                 <div id="new-thread-btn">
//                     <img src="../public/appLogo.png" alt="VirtuAI logo" />
//                     <p>New Chat</p>
//                     <p className="edit-icon">
//                     <CiEdit size='25px'/>
//                     </p>
//                 </div>
//                 <div id="user-threads">
//                     {threads?.map(thread => (
//                         <ChatHistory key={thread.id} threadId={thread.id} title={thread.title} />
//                     ))}
//                 </div>
//             </section>
//             <section id="messages">
//                 <div id="messages-content">
//                     {conversationPairs?.map((pair) => (
//                         <ConversationPair pair={pair} key={pair._id} />
//                     ))}
//                 </div>
//                 <div id="input-box">
//                     <form onSubmit={handlePromptSubmit}>
//                         <input ref={inputRef} type="text" placeholder="Enter prompt here..." onChange={e => setPrompt(e.target.value)} value={prompt}/>
//                         <Icon text="Audio" />
//                         <Icon text="File" />
//                     </form>
//                 </div>
//             </section>
//         </section>
//     )
// }
