import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import SidebarChatOptions from "./options";
import { GroupedChats } from "types/chat";
import { truncate } from "utils/functions";

interface Props {
  groupedChats: GroupedChats[];
}

const SidebarChats = ({ groupedChats }: Props) => {
  const [selectedUuid, setSelectedUuid] = React.useState<string>("");
  const params = useParams();

  const handleSelectChat = (uuid: string) => {
    if (selectedUuid !== uuid) {
      setSelectedUuid(uuid);
    }
  };

  const handleClickOutside = () => {
    if (selectedUuid !== "") {
      setSelectedUuid("");
    }
  };

  return groupedChats.length === 0 ? (
    <h3>Still no chats</h3>
  ) : (
    <nav
      aria-label="Chats list"
      className="overflow-y-auto h-[calc(100vh-60px)] pb-6 relative"
    >
      {groupedChats.map((group) => (
        <div key={group.date}>
          <h3 className="capitalize sticky top-0 bg-sidebar z-10 py-2 pl-0.5">
            {group.date}
          </h3>
          <ul className="space-y-2 pb-6 pr-2 py-2">
            {group.chats.map((chat) => (
              <li
                key={chat._id}
                className={`flex items-center rounded-md hover:bg-gray-700 transition-colors duration-200 cursor-pointer relative ${
                  params.uuid === chat._id ? "bg-gray-700" : ""
                }`}
              >
                <Link
                  href={`/chat/${chat._id}`}
                  data-testid="chat-link"
                  className="w-[calc(100%-20px)]"
                >
                  <button
                    className="block p-2 w-full text-left cursor-pointer"
                    disabled={params.uuid === chat._id}
                  >
                    {truncate(chat.title, 20)}
                  </button>
                </Link>
                <button
                  onClick={() => handleSelectChat(chat._id)}
                  className="cursor-pointer hover:bg-gray-500 rounded-full mr-1"
                >
                  <Image alt="dots" src="/dots.svg" width={25} height={25} />
                </button>
                {selectedUuid === chat._id && (
                  <SidebarChatOptions handleClickOutside={handleClickOutside} />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default SidebarChats;
