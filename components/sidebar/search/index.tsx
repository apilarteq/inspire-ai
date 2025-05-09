import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import SearchForm from "./forms/search";
import { useModal } from "context/modal";

const SidebarChatSearch = () => {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal(<SearchForm />, { darkenBackground: false });
  };

  return (
    <button
      onClick={handleClick}
      className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
      aria-label="Open Search Modal"
      data-testid="open-search-modal"
    >
      <MagnifyingGlassIcon className="w-6 h-6 text-secondary" />
    </button>
  );
};

export default SidebarChatSearch;
