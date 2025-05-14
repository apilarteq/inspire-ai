import React from "react";
import { Chat } from "types/chat";
import SearchChatItem from "./item";
import SearchChatItemSkeleton from "./item-skeleton";

interface Props {
  filteredChats: Chat[] | null;
  loading: boolean;
  searchTerm: string;
}

const SearchChatList = ({ filteredChats, loading, searchTerm }: Props) => {
  return (filteredChats && filteredChats.length > 0) || loading ? (
    <ul className="h-64 overflow-y-auto space-y-2">
      {filteredChats?.map((chat: Chat) => (
        <SearchChatItem key={chat._id} chat={chat} searchTerm={searchTerm} />
      ))}

      {loading &&
        (filteredChats && filteredChats.length > 3 ? (
          <SearchChatItemSkeleton />
        ) : (
          Array.from({ length: 3 }, (_, i) => (
            <SearchChatItemSkeleton key={i} />
          ))
        ))}
    </ul>
  ) : (
    <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
      No se encontraron chats que coincidan con tu búsqueda.
    </div>
  );
};

export default SearchChatList;
