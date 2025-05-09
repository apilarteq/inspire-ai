import React from "react";
import {
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useGlobal } from "context/global";
import { fromNow } from "utils/functions/date";

const SearchForm = () => {
  const { chats } = useGlobal();

  return (
    <div className="relative rounded-lg shadow-xl w-full  flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Chats
        </h2>
        <button
          // onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Search and New Chat */}
      <div className="p-4 space-y-3">
        {/* Buscador */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar chats..."
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-auth-input-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        {/* Botón de nuevo chat */}
        <button className="flex items-center justify-center w-full px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5 mr-2" />
          <span>Crear nuevo chat</span>
        </button>
      </div>

      {/* Lista de chats recientes */}
      <div className="overflow-y-auto flex-grow">
        <h3 className="px-4 pt-2 pb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          Chats recientes
        </h3>

        {chats && chats.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 h-64 overflow-y-auto">
            {chats.map((chat) => (
              <li
                key={chat._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <button className="w-full text-left px-4 py-3 flex items-start cursor-pointer">
                  <div className="flex items-center flex-1 gap-x-3 overflow-hidden">
                    <div className="flex-shrink-0 bg-gray-200 dark:bg-gray-600 rounded-full p-2">
                      <ChatBubbleLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {chat.title}
                    </h4>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {fromNow(chat.createdAt, { language: "es" })}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
            No se encontraron chats que coincidan con tu búsqueda.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
