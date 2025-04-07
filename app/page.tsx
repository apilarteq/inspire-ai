"use client";
import React from "react";
import UserMessage from "components/messages/user";
import AssistantMessage from "components/messages/assistant";
import { useGlobal } from "context/global";
import { Message } from "types/message";

export default function App() {
  const messagedEndRef = React.useRef<HTMLDivElement>(null);
  const { messages } = useGlobal();

  React.useEffect(() => {
    if (messagedEndRef.current) {
      messagedEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="text-white w-full pb-[170px] xl:mt-5 lg:mt-[10px]">
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
}
