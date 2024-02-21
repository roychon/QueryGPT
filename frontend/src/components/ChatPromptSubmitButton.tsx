import React from "react";
import Icon from "./Icons";

export default function ChatPromptSubmitButton({handlePromptSubmit, inputRef, setPrompt, prompt, onSpeech}) {
    return (
        <form onSubmit={handlePromptSubmit}>
            <input ref={inputRef} type="text" placeholder="Enter prompt here..." onChange={e => setPrompt(e.target.value)} value={prompt}/>
            <button onClick={onSpeech}>
                <Icon text="Audio" />
            </button>
            <Icon text="File" />
        </form>
    )
}