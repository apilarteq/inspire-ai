"use client";
import React from "react";
import UserMessage from "../messages/user";
import AssistantMessage from "../messages/assistant";
import { useGlobal } from "context/global";
import { Message } from "types/message";

interface Props {
  messages: Message[];
}

const Chat = ({ messages }: Props) => {
  const [render, setRender] = React.useState<boolean>(false);
  const messagedEndRef = React.useRef<HTMLDivElement>(null);
  const { setMessages } = useGlobal();

  React.useEffect(() => {
    if (messages.length === 0) return;

    setMessages(messages);
    requestAnimationFrame(() => {
      if (messagedEndRef.current) {
        messagedEndRef.current.scrollIntoView({ behavior: "instant" });
      }
    });
  }, [setMessages, messages]);

  React.useEffect(() => {
    setRender(true);
  }, []);

  return (
    messages.length > 0 && (
      <div
        className={`text-white w-full transition-opacity duration-1000 min-h-[calc(100vh-200px)] h-[calc(100vh-200px)] space-y-6 pt-5 overflow-y-auto ${
          render ? "opacity-100" : "opacity-0"
        }`}
      >
        {messages.map((message: Message) =>
          message.role === "user" ? (
            <UserMessage key={message._id} content={message.content} />
          ) : (
            <AssistantMessage key={message._id} content={message.content} />
          )
        )}
        <div ref={messagedEndRef} />
      </div>
    )
  );
};

export default Chat;
