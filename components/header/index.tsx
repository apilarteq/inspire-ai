"use client";
import React from "react";
import Image from "next/image";
import { useGlobal } from "context/global";
import HeaderAuthButtons from "./auth-buttons";
import { useAuth } from "@/context/auth";

interface Props {
  isAuthenticated: boolean;
}

const Header = ({ isAuthenticated }: Props) => {
  const { openSidebar, toggleSidebar } = useGlobal();
  const { handleLogout } = useAuth();

  return (
    <header className="text-gray-100 xl:border-none xl:bg-transparent border-b border-header bg-primary py-4 px-6 sticky top-0 w-full flex justify-between">
      <div className="flex items-center">
        <div
          className={`flex items-center ${
            openSidebar ? "flex-row-reverse" : ""
          }`}
        >
          <button
            onClick={toggleSidebar}
            className={`p-1 mr-2 rounded-md hover:bg-gray-100 cursor-pointer transition-all ${
              openSidebar
                ? "opacity-0 mr-0 pointer-events-none duration-0"
                : "opacity-100 duration-200"
            }`}
            aria-label="Open Sidebar"
            data-testid="open-sidebar"
          >
            <Image
              alt="Open sidebar icon"
              src="/sidebar-icon.svg"
              width={26}
              height={26}
              className="rotate-180"
            />
          </button>
          <h1 className="text-xl font-bold">Inspire AI</h1>
        </div>
      </div>
      {!isAuthenticated ? (
        <HeaderAuthButtons />
      ) : (
        <button className="cursor-pointer" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
