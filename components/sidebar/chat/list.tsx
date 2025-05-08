import React from "react";
import SidebarChatItem from "./item";
import SidebarChatEditableItem from "./editable-item";
import { DropdownAction } from "types/dropdown";
import { Chat } from "types/chat";

interface Props {
  chats: Chat[];
  currentUuid?: string;
  selectedUuid: string;
  action: DropdownAction | null;
  handleClickOutside: () => void;
  handleAction: (action: DropdownAction | null) => void;
  handleSelectChat: (uuid: string) => void;
}

const SidebarChatList = ({
  chats,
  currentUuid,
  selectedUuid,
  ...props
}: Props) => {
  React.useEffect(() => {
    props.handleAction(null);
  }, [chats]);

  const renderChatItem = (chat: Chat) => {
    const isEditing = selectedUuid === chat._id && props.action === "rename";

    if (isEditing) {
      return (
        <SidebarChatEditableItem
          key={chat._id}
          uuid={chat._id}
          title={chat.title}
        />
      );
    }

    return (
      <SidebarChatItem
        key={chat._id}
        uuid={chat._id}
        title={chat.title}
        currentUuid={currentUuid ?? ""}
        selectedUuid={selectedUuid}
        handleClickOutside={props.handleClickOutside}
        handleAction={props.handleAction}
        handleSelectChat={props.handleSelectChat}
      />
    );
  };

  return (
    <ul className="space-y-2 pb-6 pr-2 py-2">
      {chats.map((chat: Chat) => renderChatItem(chat))}
    </ul>
  );
};

export default SidebarChatList;
