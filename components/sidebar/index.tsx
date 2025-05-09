"use client";

import React from "react";
import Link from "next/link";
import { PencilSquareIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import SidebarChats from "./chat";
import SidebarChatSearch from "./search";
import { GroupedChats } from "types/chat";
import { useGlobal } from "context/global";

interface Props {
  groupedChats: GroupedChats[];
  isAuthenticated: boolean;
}

const Sidebar = ({ groupedChats, isAuthenticated }: Props) => {
  const { toggleSidebar, openSidebar, setChats } = useGlobal();

  React.useEffect(() => {
    if (!isAuthenticated) return;

    const chats = groupedChats.map((chat) => chat.chats);

    setChats(chats.flat());
  }, [isAuthenticated, groupedChats, setChats]);

  return (
    <aside
      aria-label="Sidebar"
      data-testid="sidebar"
      className={`bg-sidebar text-gray-200 shadow-lg transition-[width] duration-500 ease-in-out shrink-0 sticky ${
        openSidebar && isAuthenticated
          ? "w-[240px] border-r border-zinc-800"
          : "w-0 overflow-hidden"
      }`}
    >
      <div className="flex h-full flex-col pl-2">
        <header className="flex overflow-hidden justify-between items-center py-4 px-2">
          <div className="flex gap-x-4 items-center">
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              aria-label="Close Sidebar"
              data-testid="close-sidebar"
            >
              <ViewColumnsIcon className="w-6 h-6 text-secondary" />
            </button>
            <Link
              href="/"
              className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              aria-label="Create new chat"
              data-testid="create-chat"
            >
              <PencilSquareIcon className="w-6 h-6 text-secondary" />
            </Link>
          </div>
          <SidebarChatSearch />
        </header>
        <SidebarChats groupedChats={groupedChats} />
      </div>
    </aside>
  );
};

export default Sidebar;
