import React from "react";
import UserMessage from "components/messages/user";
import AssistantMessage from "components/messages/assistant";
import { loadMessages } from "utils/actions";
import { Message } from "types/message";

export default async function Home() {
  const messages = await loadMessages();

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
}
