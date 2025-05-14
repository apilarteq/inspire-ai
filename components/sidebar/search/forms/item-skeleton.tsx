import React from "react";

const SearchChatItemSkeleton = () => {
  return (
    <li
      role="status"
      className="w-full animate-pulse flex items-center px-4 pt-3"
    >
      <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-3"></div>
      <div className="ml-2 flex-1 overflow-hidden">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-64"></div>
      </div>
    </li>
  );
};

export default SearchChatItemSkeleton;
