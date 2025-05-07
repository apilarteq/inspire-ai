import React from "react";
import { usePathname } from "next/navigation";
import SidebarChatList from "./list";
import { DropdownAction } from "types/dropdown";
import { GroupedChats } from "types/chat";

interface Props {
  groupedChats: GroupedChats[];
}

const SidebarChats = ({ groupedChats }: Props) => {
  const [action, setAction] = React.useState<DropdownAction | null>(null);
  const [selectedUuid, setSelectedUuid] = React.useState<string>("");
  const [chatUuid, setChatUuid] = React.useState<string | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const match = pathname.match(/\/chat\/([^/]+)/);
    if (match) {
      setChatUuid(match[1]);
    } else {
      setChatUuid(null);
    }
  }, [pathname]);

  const handleSelectChat = React.useCallback(
    (uuid: string) => {
      if (selectedUuid !== uuid) {
        setSelectedUuid(uuid);
      }
    },
    [selectedUuid]
  );

  const handleClickOutside = React.useCallback(() => {
    if (selectedUuid !== "") {
      setSelectedUuid("");
    }
  }, [selectedUuid]);

  const handleAction = React.useCallback((action: DropdownAction | null) => {
    setAction(action);
    if (action === null) setSelectedUuid("");
  }, []);

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
            selectedUuid={selectedUuid}
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
