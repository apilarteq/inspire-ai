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
  const { setMessages, messageBoxPosition } = useGlobal();

  React.useEffect(() => {
    setMessages(messages);
    if (messagedEndRef.current) {
      messagedEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [setMessages, messages]);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (messageBoxPosition !== "bottom") {
      timeout = setTimeout(() => {
        setRender(true);
      }, 700);
    } else setRender(true);

    return () => clearTimeout(timeout);
  }, [messageBoxPosition]);

  return (
    <div
      className={`text-white w-full pb-[70px] xl:mt-5 lg:mt-[10px] transition-opacity duration-1000 ${
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
  );
};

export default Chat;
