"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Message } from "types/message";
import { Chat } from "types/chat";

interface GlobalContextProps {
  openSidebar: boolean;
  toggleSidebar: () => void;
  messages: Message[];
  addMessage: (message: Message) => void;
  updateStreamedMessage: (uuid: string, content: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setChats: React.Dispatch<React.SetStateAction<Chat[] | null>>;
  chatUuid: string | null;
  setChatUuid: React.Dispatch<React.SetStateAction<string | null>>;
  filterChats: (searchTerm: string) => Chat[] | null;
  addChats: (chatsToAdd: Chat[]) => void;
}

interface Props {
  children: React.ReactNode;
}

const GlobalContext = React.createContext({} as GlobalContextProps);

export const useGlobal = () => React.useContext(GlobalContext);

const GlobalProvider = ({ children }: Props) => {
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(true);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [chats, setChats] = React.useState<Chat[] | null>(null);
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

  const toggleSidebar = React.useCallback(
    () => setOpenSidebar(!openSidebar),
    [openSidebar]
  );

  const addMessage = React.useCallback(
    (message: Message) => setMessages((prev) => [...prev, message]),
    []
  );

  const updateStreamedMessage = React.useCallback(
    (_id: string, content: string) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === _id ? { ...msg, content: msg.content + content } : msg
        )
      );
    },
    []
  );

  const filterChats = React.useCallback(
    (searchTerm: string): Chat[] | null => {
      if (!chats) return null;

      const lowerSearch = searchTerm.toLowerCase();

      return chats.filter(
        (chat) =>
          chat.title.toLowerCase().includes(lowerSearch) ||
          chat.message?.toLowerCase().includes(lowerSearch)
      );
    },
    [chats]
  );

  const addChats = React.useCallback(
    (chatsToAdd: Chat[]) => {
      const newChats = chatsToAdd.filter(
        (chat) => !chats?.some((c) => c._id === chat._id)
      );
      setChats((prev) => [...prev!, ...newChats]);
    },
    [chats]
  );

  const globalProviderValue = React.useMemo(
    () => ({
      openSidebar,
      toggleSidebar,
      messages,
      addMessage,
      updateStreamedMessage,
      setMessages,
      setChats,
      chatUuid,
      setChatUuid,
      filterChats,
      addChats,
    }),
    [
      openSidebar,
      toggleSidebar,
      messages,
      addMessage,
      updateStreamedMessage,
      chatUuid,
      filterChats,
      addChats,
    ]
  );

  return (
    <GlobalContext.Provider value={globalProviderValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
