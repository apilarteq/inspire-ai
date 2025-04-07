"use client";
import React, { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Chat } from "types/chat";
import { useGlobal } from "context/global";

interface Props {
  chats: Chat[];
  isAuthenticated: boolean;
}

const SidebarClient: React.FC<PropsWithChildren<Props>> = ({
  chats,
  isAuthenticated,
}) => {
  const router = useRouter();
  const { toggleSidebar, openSidebar, setMessages } = useGlobal();

  const handleCreateChat = () => {
    router.push("/");
    setMessages([]);
  };

  return (
    <aside
      aria-label="Sidebar"
      data-testid="sidebar"
      className={`bg-sidebar text-gray-200 shadow-lg transition-all duration-500 ease-in-out shrink-0 h-screen ${
        openSidebar && isAuthenticated
          ? "w-[240px] translate-x-0 opacity-100"
          : "w-0 -translate-x-full opacity-0"
      }`}
    >
      <div className="flex h-full flex-col pl-2">
        <header className="flex justify-between items-center py-4 px-2">
          <div className="flex gap-x-4 items-center">
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              aria-label="Close Sidebar"
              data-testid="close-sidebar"
            >
              <Image
                alt="Close sidebar icon"
                src="/sidebar-icon.svg"
                width={26}
                height={26}
              />
            </button>
            <button
              onClick={handleCreateChat}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              aria-label="Create new chat"
              data-testid="create-chat"
            >
              <Image
                alt="Create New Chat Icon"
                src="/pencil.svg"
                width={26}
                height={26}
              />
            </button>
          </div>
          <button
            className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            aria-label="Open Search Modal"
            data-testid="open-search-modal"
          >
            <Image alt="Search icon" src="/search.svg" width={26} height={26} />
          </button>
        </header>
        {chats.length === 0 ? (
          <h3>Still no chats</h3>
        ) : (
          <nav aria-label="Chats list">
            <ul className="space-y-2 overflow-y-auto h-[calc(100vh-60px)] pb-6 pr-4 py-2">
              {chats.map((chat) => (
                <li key={chat._id}>
                  <Link href={`/chat/${chat._id}`}>
                    <button className="block p-2 rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer w-full text-left truncate">
                      {chat.title}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </aside>
  );
};

export default SidebarClient;
