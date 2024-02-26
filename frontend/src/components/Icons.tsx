import React from "react";
import { IoIosSend } from "react-icons/io";
import { AiOutlineAudio } from "react-icons/ai";

export default function Icon({ text }: { text: String }) {
  return (
    <p
      style={{
        padding: "1px 15px",
        outline: "none",
        border: "1px solid white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "15px",
      }}
    >
      {text == "Audio" ? <AiOutlineAudio /> : <IoIosSend />}
    </p>
  );
}
