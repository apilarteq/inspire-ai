"use client";
import React from "react";
import io, { Socket } from "socket.io-client";
import { toast } from "sonner";
import { useGlobal } from "./global";
import { Message } from "types/message";
import { Error } from "types/error";
import { config } from "../config";

interface SocketProps {
  socket: Socket;
  sendMessage: (value: string) => void;
  loading: boolean;
}

interface Props {
  children: React.ReactNode;
}

const SocketContext = React.createContext({} as SocketProps);

export const useSocket = () => React.useContext(SocketContext);

const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = React.useState<Socket>({} as Socket);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [chatUuid, setChatUuid] = React.useState<string | null>(null);
  const { addMessage, updateStreamedMessage } = useGlobal();

  React.useEffect(() => {
    const newSocket = io(config.apiUrl, {
      transports: ["websocket"],
    });

    newSocket.on("message-saved-successfully", (data: Message) => {
      addMessage(data);
    });

    newSocket.on("error", (error: Error) => {
      setLoading(false);
      toast.error(error.message, { position: "top-center" });
    });

    newSocket.on("streamed-message", (data) => {
      if (data.isFirstChunk) {
        addMessage({
          uuid: data.uuid,
          content: data.content,
          createdAt: new Date().toISOString(),
          role: data.role,
        });
      } else {
        updateStreamedMessage(data.uuid, data.content);
      }
    });

    newSocket.on("end-streamed-message", (data: { chatUuid?: string }) => {
      setLoading(false);
      if (data?.chatUuid) setChatUuid(data.chatUuid);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [addMessage, updateStreamedMessage]);

  const sendMessage = React.useCallback(
    (value: string) => {
      const message = {
        content: value,
        chatUuid: chatUuid ?? null,
      };

      setLoading(true);

      if (chatUuid) {
        socket.emit("message", message);
      } else {
        socket.emit("start-chat", message);
      }
    },
    [socket, chatUuid]
  );

  // React.useEffect(() => {
  //   const request = async () => {
  //     const res = await fetch(`${config.apiUrl}/ai`, {
  //       credentials: "include",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //   };
  //   request();
  // }, []);

  const socketProviderValue = React.useMemo(
    () => ({
      socket,
      sendMessage,
      loading,
    }),
    [socket, sendMessage, loading]
  );

  return (
    <SocketContext.Provider value={socketProviderValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
