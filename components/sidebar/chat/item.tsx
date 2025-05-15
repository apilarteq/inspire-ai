import React from "react";
import Link from "next/link";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import SidebarChatOptions from "./dropdown-options";
import { truncate } from "utils/functions/text";
import { DropdownAction } from "types/dropdown";
import { SelectedChat } from "types/chat";

interface Props {
  uuid: string;
  title: string;
  currentUuid: string;
  selectedUuid: string;
  handleClickOutside: () => void;
  handleAction: (action: DropdownAction) => void;
  handleSelectChat: (chat: SelectedChat) => void;
}

const SidebarChatItem = ({ uuid, title, currentUuid, ...props }: Props) => {
  return (
    <li
      key={uuid}
      data-testid="chat-item"
      className={`flex items-center rounded-md transition-colors duration-200 cursor-pointer relative ${
        currentUuid === uuid
          ? "bg-purple-900/30 hover:bg-purple-900/40 active:bg-purple-900/60 !text-purple-300"
          : "hover:bg-zinc-800 text-zinc-400"
      }`}
    >
      <Link
        href={`/chat/${uuid}`}
        data-testid="chat-link"
        className="w-[calc(100%-20px)]"
      >
        <span className="block p-2 w-full text-left cursor-pointer text-nowrap">
          {truncate(title, 20)}
        </span>
      </Link>
      <button
        onClick={() => props.handleSelectChat({ _id: uuid, title })}
        className={`cursor-pointer hover:bg-purple-900/60 rounded-full mr-1 ${
          props.selectedUuid === uuid && "bg-purple-900/60"
        }`}
      >
        <EllipsisHorizontalIcon className="w-5 h-5" />
      </button>
      {props.selectedUuid === uuid && (
        <SidebarChatOptions
          handleClickOutside={props.handleClickOutside}
          handleAction={props.handleAction}
        />
      )}
    </li>
  );
};

export default SidebarChatItem;
