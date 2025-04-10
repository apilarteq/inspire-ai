"use client";
import React from "react";
import MessageBoxCard from "./card";
import { useGlobal } from "context/global";

const MessageBox = () => {
  const { messages } = useGlobal();

  return (
    <div
      className={`flex justify-center w-full transition-all bg-primary duration-700 ease-in-out opacity-100 px-5 pb-5 ${
        messages.length === 0
          ? "absolute bottom-1/2 translate-y-1/2"
          : "sticky bottom-0"
      }`}
    >
      <div className="max-w-3xl w-full rounded-xl text-center transition-all duration-500 transform">
        {messages.length === 0 && (
          <h2 className="text-3xl font-bold mb-6 text-[#e0ffff]">
            ¿En qué puedo ayudarte?
          </h2>
        )}
        <MessageBoxCard />
      </div>
    </div>
  );
};

export default MessageBox;
