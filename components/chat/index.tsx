"use client";
import React from "react";
import UserMessage from "../messages/user";
import AssistantMessage from "../messages/assistant";
import { useGlobal } from "context/global";
import { Message } from "types/message";

interface Props {
  messages: Message[] | null;
}

const Chat = ({ messages }: Props) => {
  const [render, setRender] = React.useState<boolean>(false);
  const messagedEndRef = React.useRef<HTMLDivElement>(null);
  const { setMessages } = useGlobal();

  React.useEffect(() => {
    if (!messages) return;

    setMessages(messages);
    requestAnimationFrame(() => {
      if (messagedEndRef.current) {
        messagedEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
  }, [setMessages, messages]);

  React.useEffect(() => {
    setRender(true);
  }, []);

  return (
    messages &&
    messages.length > 0 && (
      <div
        className={`text-white w-full transition-opacity duration-1000 pb-5 min-h-[calc(100vh-200px)] ${
          render ? "opacity-100" : "opacity-0"
        }`}
      >
        {messages?.map((message: Message) =>
          message.role === "user" ? (
            <div
              key={message._id}
              data-testid={message._id}
              className="flex max-w-3xl mx-auto justify-end py-5"
            >
              <UserMessage key={message._id} content={message.content} />
            </div>
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
