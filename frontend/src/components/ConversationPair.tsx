import React from "react"
import ChatItem from "./ChatItem"

export default function ConversationPair({pair}) {
    return (
        <>
            <ChatItem text={pair.user.content} role={pair.user.role} />
            <ChatItem text={pair.system?.content} role={pair.system?.role} />
        </>
    )
}