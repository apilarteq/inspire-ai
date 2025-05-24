"use client";
import React from "react";
import MessageBoxCard from "./card";
import MessageBoxTitle from "./title";
import { useGlobal } from "context/global";

const MessageBox = () => {
  const { messages } = useGlobal();

  return (
    <div
      data-testid="message-box"
      className={`flex justify-center left-0 right-0 mx-auto transition-all bg-primary duration-700 ease-in-out opacity-100 px-5 pb-5 ${
        messages.length === 0
          ? "absolute bottom-1/2 translate-y-1/2"
          : "sticky bottom-0"
      }`}
    >
      <div className="max-w-3xl w-full rounded-xl text-center transition-all duration-500 transform space-y-5">
        {messages.length === 0 && <MessageBoxTitle />}
        <MessageBoxCard />
      </div>
    </div>
  );
};

export default MessageBox;
