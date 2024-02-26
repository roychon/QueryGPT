import React from "react";
import { NavLink } from "react-router-dom";

export default function ChatHistory({ threadId, title }) {
  return (
    <NavLink
      to={`/chats/${threadId}`}
      className={({ isActive }) =>
        isActive ? "bg-bright-purple" : "bg-inherit"
      }
    >
      <div className=" px-[10px] py-2 rounded-lg border-white border-[1px] hover:bg-bright-purple">
        {title}
      </div>
    </NavLink>
  );
}
