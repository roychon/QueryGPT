import React from "react";
import { CiEdit } from "react-icons/ci";

export default function AddChatButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <div
      className="flex justify-start items-center w-[95%] rounded-lg hover:bg-bright-purple"
      onClick={handleClick}
    >
      <img
        src="../public/appLogo.png"
        alt="VirtuAI logo"
        className="h-10 relative"
      />
      <p className="font-bold">New Chat</p>
      <p className="ml-3">
        <CiEdit size="20px" />
      </p>
    </div>
  );
}
