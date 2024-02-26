import React from "react";
import Icon from "./Icons";
import { IconContext } from "react-icons";

export default function ChatPromptSubmitButton({
  handlePromptSubmit,
  inputRef,
  setPrompt,
  prompt,
  onSpeech,
}) {
  return (
    <form className="w-full flex gap-[15px]">
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter prompt here..."
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handlePromptSubmit();
            }
          }}
          value={prompt}
          className=" px-[10px] py-[15px] w-full border-[1px] border-white rounded-[10px] outline-none bg-inherit"
        />
        <button
          onClick={onSpeech}
          className="flex absolute right-5 top-0 h-full items-center"
        >
          <IconContext.Provider value={{ size: "20px" }}>
            <Icon text="Audio" />
          </IconContext.Provider>
        </button>
      </div>
    </form>
  );
}
