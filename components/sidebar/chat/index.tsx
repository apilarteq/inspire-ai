import React from "react";
import SidebarChatList from "./list";
import DeleteChatForm from "./forms/delete";
import { DropdownAction } from "types/dropdown";
import { GroupedChats, SelectedChat } from "types/chat";
import { useGlobal } from "context/global";
import { useModal } from "context/modal";

interface Props {
  groupedChats: GroupedChats[];
}

const SidebarChats = ({ groupedChats }: Props) => {
  const [action, setAction] = React.useState<DropdownAction | null>(null);
  const [selectedChat, setSelectedChat] = React.useState<SelectedChat>(
    {} as SelectedChat
  );
  const { chatUuid } = useGlobal();
  const { openModal } = useModal();

  const handleSelectChat = React.useCallback((chat: SelectedChat) => {
    setSelectedChat(chat);
  }, []);

  const handleClickOutside = React.useCallback(() => {
    setSelectedChat({} as SelectedChat);
  }, []);

  const handleAction = React.useCallback(
    (action: DropdownAction | null) => {
      setAction(action);
      if (action === "delete") {
        openModal(
          <DeleteChatForm chat={selectedChat} currentChatUuid={chatUuid} />
        );
        setSelectedChat({} as SelectedChat);
      }

      if (action === null) setSelectedChat({} as SelectedChat);
    },
    [selectedChat, openModal, chatUuid]
  );

  return groupedChats.length === 0 ? (
    <h3 className="truncate">Still no chats</h3>
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
          <SidebarChatList
            chats={group.chats}
            currentUuid={chatUuid ?? ""}
            selectedUuid={selectedChat._id}
            action={action}
            handleClickOutside={handleClickOutside}
            handleAction={handleAction}
            handleSelectChat={handleSelectChat}
          />
        </div>
      ))}
    </nav>
  );
};

export default SidebarChats;
