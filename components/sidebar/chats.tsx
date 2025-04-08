import React from "react";
import Link from "next/link";
import { GroupedChats } from "types/chat";

interface Props {
  groupedChats: GroupedChats[];
}

const SidebarChats = ({ groupedChats }: Props) => {
  return groupedChats.length === 0 ? (
    <h3>Still no chats</h3>
  ) : (
    <nav
      aria-label="Chats list"
      className="overflow-y-auto h-[calc(100vh-60px)] pb-6 pr-4"
    >
      {groupedChats.map((group) => (
        <div key={group.date}>
          <h3 className="capitalize sticky top-0 bg-sidebar py-2">
            {group.date}
          </h3>
          <ul className="space-y-2 pb-6 pr-4 py-2">
            {group.chats.map((chat) => (
              <li key={chat._id}>
                <Link href={`/chat/${chat._id}`}>
                  <button className="block p-2 rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer w-full text-left truncate">
                    {chat.title}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default SidebarChats;
