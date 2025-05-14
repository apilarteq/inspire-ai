import React from "react";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import MessageItem from "./items/message-item";
import TitleItem from "./items/title-item";
import { Chat } from "types/chat";

interface Props {
  chat: Chat;
  searchTerm: string;
}

const SearchChatItem = ({ chat, searchTerm }: Props) => {
  return (
    <li className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <button className="w-full text-left px-4 py-3 flex items-start">
        <div className="flex-shrink-0 bg-gray-200 dark:bg-gray-600 rounded-full p-2">
          <ChatBubbleLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
        </div>
        {chat.message ? (
          <MessageItem
            title={chat.title}
            message={chat.message}
            createdAt={chat.createdAt}
            searchTerm={searchTerm}
          />
        ) : (
          <TitleItem title={chat.title} createdAt={chat.createdAt!} />
        )}
      </button>
    </li>
  );
};

export default SearchChatItem;
