"use client";
import React from "react";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
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
    <header className="sticky top-0 w-full z-10 text-gray-100">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-16 relative w-full">
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
                <ViewColumnsIcon className="w-6 h-6 text-secondary" />
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
        </div>
      </div>
    </header>
  );
};

export default Header;
