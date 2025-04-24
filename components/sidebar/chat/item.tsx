import React from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarChatOptions from "./dropdown-options";
import { truncate } from "utils/functions";
import { DropdownAction } from "types/dropdown";

interface Props {
  uuid: string;
  title: string;
  currentUuid: string;
  selectedUuid: string;
  handleClickOutside: () => void;
  handleAction: (action: DropdownAction) => void;
  handleSelectChat: (uuid: string) => void;
}

const SidebarChatItem = ({ uuid, title, currentUuid, ...props }: Props) => {
  return (
    <li
      key={uuid}
      className={`flex items-center rounded-md hover:bg-[#3c3939] active:bg-[#342f2f] transition-colors duration-200 cursor-pointer relative ${
        currentUuid === uuid && "bg-[#474646]"
      }`}
    >
      <Link
        href={`/chat/${uuid}`}
        data-testid="chat-link"
        className="w-[calc(100%-20px)]"
      >
        <button
          className="block p-2 w-full text-left cursor-pointer"
          disabled={currentUuid === uuid}
        >
          {truncate(title, 20)}
        </button>
      </Link>
      <button
        onClick={() => props.handleSelectChat(uuid)}
        className={`cursor-pointer hover:bg-[#444444] rounded-full mr-1 ${
          props.selectedUuid === uuid && "bg-[#444444]"
        }`}
      >
        <Image alt="dots" src="/dots.svg" width={25} height={25} />
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
