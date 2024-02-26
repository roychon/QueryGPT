import React from "react";
import { PiFinnTheHuman } from "react-icons/pi";
import { LiaRobotSolid } from "react-icons/lia";

export default function ChatItem({ text, role }) {
  return (
    <section
      className={`w-full flex flex-col items-center ${
        role == "User" ? "bg-background-gray" : "bg-inherit"
      }`}
    >
      <div className="flex flex-col w-[700px] rounded-[6px] py-8 px-6">
        <div className=" flex gap-4 items-center">
          {role == "User" ? <PiFinnTheHuman /> : <LiaRobotSolid />}
          <p className=" font-bold">{role}</p>
        </div>
        <p>{text ? text : "Loading..."}</p>
      </div>
    </section>
  );
}
