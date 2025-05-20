"use client";
import React from "react";
import { SparklesIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import HeaderAuthButtons from "./auth-buttons";
import { useGlobal } from "context/global";
import { useAuth } from "context/auth";

interface Props {
  isAuthenticated: boolean;
}

const Header = ({ isAuthenticated }: Props) => {
  const { openSidebar, toggleSidebar } = useGlobal();
  const { handleLogout } = useAuth();

  return (
    <header className="sticky top-0 w-full border-b border-zinc-800 bg-primary z-10 text-gray-100 px-10">
      <div className="flex justify-between items-center h-16">
        <div
          data-testid="header-left-side"
          className={`flex items-center ${
            openSidebar ? "flex-row-reverse" : "flex row"
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
            <ViewColumnsIcon className="w-6 h-6 text-secondary" />
          </button>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-zinc-300">Inspire AI</h1>
            <SparklesIcon className="w-7 h-7 text-secondary ml-3" />
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3>Explorar</h3>
          <h3>Contacto</h3>
        </div>
        {!isAuthenticated ? (
          <HeaderAuthButtons />
        ) : (
          <button
            className="cursor-pointer text-zinc-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
