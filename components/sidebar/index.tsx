"use client";
import React, { PropsWithChildren } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import SidebarChats from "./chat";
import { GroupedChats } from "types/chat";
import { useGlobal } from "context/global";

interface Props {
  groupedChats: GroupedChats[];
  isAuthenticated: boolean;
}

const Sidebar: React.FC<PropsWithChildren<Props>> = ({
  groupedChats,
  isAuthenticated,
}) => {
  const { toggleSidebar, openSidebar } = useGlobal();

  return (
    <aside
      aria-label="Sidebar"
      data-testid="sidebar"
      className={`bg-sidebar text-gray-200 shadow-lg transition-all duration-500 ease-in-out shrink-0 h-screen ${
        openSidebar && isAuthenticated ? "w-[240px]" : "w-0"
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
          <button
            className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            aria-label="Open Search Modal"
            data-testid="open-search-modal"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-secondary" />
          </button>
        </header>
        <SidebarChats groupedChats={groupedChats} />
      </div>
    </aside>
  );
};

export default Sidebar;
