import React from "react";
import Icon from "./Icons";

export default function ChatPromptSubmitButton({handlePromptSubmit, inputRef, setPrompt, prompt}) {
    return (
        <form onSubmit={handlePromptSubmit}>
            <input ref={inputRef} type="text" placeholder="Enter prompt here..." onChange={e => setPrompt(e.target.value)} value={prompt}/>
            <Icon text="Audio" />
            <Icon text="File" />
        </form>
    )
}