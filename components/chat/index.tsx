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
  const { setMessages } = useGlobal();

  React.useEffect(() => {
    setMessages(messages);
  }, [setMessages, messages]);

  return (
    <div className="text-white w-full pb-[70px] xl:mt-5 lg:mt-[10px]">
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
    </div>
  );
};

export default Chat;
