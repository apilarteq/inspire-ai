"use client";
import React from "react";
import io, { Socket } from "socket.io-client";
import { toast } from "sonner";
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import { useRouter } from "next/navigation";
import { useGlobal } from "./global";
import { MessageWithChatUuid } from "types/message";
import { Error } from "types/error";
import { config } from "config";
import { revalidate } from "utils/lib/revalidation";

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
  const { addMessage, updateStreamedMessage, chatUuid, setChatUuid } =
    useGlobal();
  const router = useRouter();

  React.useEffect(() => {
    const newSocket = io(config.apiUrl, {
      transports: ["websocket"],
    });

    newSocket.on("message-saved-successfully", (data: MessageWithChatUuid) => {
      addMessage(data);
    });

    newSocket.on("error", (error: Error) => {
      setLoading(false);
      toast.error(error.message);
    });

    newSocket.on("streamed-message", (data) => {
      if (data.isFirstChunk) {
        addMessage({
          _id: data._id,
          content: data.content,
          createdAt: new Date().toISOString(),
          role: data.role,
        });
      } else {
        updateStreamedMessage(data._id, data.content);
      }
    });

    newSocket.on("end-streamed-message", (data: { chatUuid?: string }) => {
      setLoading(false);
      if (data?.chatUuid) {
        router.push(`/chat/${data.chatUuid}`);
        revalidate("/");
        setChatUuid(data.chatUuid);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [addMessage, updateStreamedMessage, router, setChatUuid]);

  const sendMessage = React.useCallback(
    async (value: string) => {
      if (!socket.connected) {
        toast.error(
          "El servicio no está disponible en este momento. Inténtalo más tarde."
        );
        return;
      }

      const visitorId = await getFingerprint();

      const message = {
        content: value,
        chatUuid: chatUuid ?? null,
        visitorId,
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
