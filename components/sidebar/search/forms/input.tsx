import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ searchTerm, setSearchTerm, ...props }: Props) => {
  return (
    <div className="p-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          autoFocus
          placeholder="Buscar chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-auth-input-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary"
          {...props}
        />
      </div>
    </div>
  );
};

export default SearchInput;
