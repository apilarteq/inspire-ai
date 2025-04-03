"use client";
import React from "react";
import UserMessage from "components/messages/user";
import AssistantMessage from "components/messages/assistant";
import { useGlobal } from "context/global";
import { Message } from "types/message";

const Home = () => {
  const { messages } = useGlobal();

  return (
    <div className="text-white w-full pb-[70px] xl:mt-5 lg:mt-[10px]">
      {messages?.map((message: Message) =>
        message.role === "user" ? (
          <div
            key={message.uuid}
            data-testid={message.uuid}
            className="flex max-w-3xl mx-auto justify-end py-5"
          >
            <UserMessage key={message.uuid} content={message.content} />
          </div>
        ) : (
          <AssistantMessage key={message.uuid} content={message.content} />
        )
      )}
    </div>
  );
};

export default Home;
