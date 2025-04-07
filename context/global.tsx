"use client";
import React from "react";
import { Message } from "types/message";

interface GlobalContextProps {
  openSidebar: boolean;
  toggleSidebar: () => void;
  messages: Message[];
  addMessage: (message: Message) => void;
  updateStreamedMessage: (uuid: string, content: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

interface Props {
  children: React.ReactNode;
}

const GlobalContext = React.createContext({} as GlobalContextProps);

export const useGlobal = () => React.useContext(GlobalContext);

const GlobalProvider = ({ children }: Props) => {
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(true);
  const [messages, setMessages] = React.useState<Message[]>([]);

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

  const globalProviderValue = React.useMemo(
    () => ({
      openSidebar,
      toggleSidebar,
      messages,
      addMessage,
      updateStreamedMessage,
      setMessages,
    }),
    [openSidebar, toggleSidebar, messages, addMessage, updateStreamedMessage]
  );

  return (
    <GlobalContext.Provider value={globalProviderValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
