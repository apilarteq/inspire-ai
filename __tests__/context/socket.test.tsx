import React from "react";
import { render, act } from "@testing-library/react";
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import { toast } from "sonner";
import io from "socket.io-client";
import SocketProvider, { useSocket } from "context/socket";
import { useGlobal } from "context/global";

jest.mock("socket.io-client");

jest.mock("@thumbmarkjs/thumbmarkjs", () => ({
  getFingerprint: jest.fn().mockResolvedValue("mocked-fingerprint"),
}));

jest.mock("utils/lib/revalidation", () => ({
  revalidate: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("context/global", () => ({
  useGlobal: jest.fn(() => ({
    addMessage: jest.fn(),
    updateStreamedMessage: jest.fn(),
    setChatUuid: jest.fn(),
    chatUuid: null,
  })),
}));

const mockEmit = jest.fn();
const mockOn = jest.fn();
const mockDisconnect = jest.fn();

const TestComponent = () => {
  const { sendMessage } = useSocket();

  React.useEffect(() => {
    sendMessage("Hola mundo");
  }, [sendMessage]);

  return <div>Socket Test</div>;
};

describe("SocketProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should emit 'start-chat' if no chatUuid", async () => {
    (io as jest.Mock).mockReturnValue({
      emit: mockEmit,
      on: mockOn,
      disconnect: mockDisconnect,
      connected: true,
    });

    await act(async () => {
      render(
        <SocketProvider>
          <TestComponent />
        </SocketProvider>
      );
    });

    expect(getFingerprint).toHaveBeenCalled();
    expect(mockEmit).toHaveBeenCalledWith(
      "start-chat",
      expect.objectContaining({
        content: "Hola mundo",
        chatUuid: null,
        visitorId: "mocked-fingerprint",
      })
    );
  });

  it("Should emit 'message' if chatUuid", async () => {
    (io as jest.Mock).mockReturnValue({
      emit: mockEmit,
      on: mockOn,
      disconnect: mockDisconnect,
      connected: true,
    });
    (useGlobal as jest.Mock).mockReturnValue({
      chatUuid: "mocked-chat-uuid",
    });

    await act(async () => {
      render(
        <SocketProvider>
          <TestComponent />
        </SocketProvider>
      );
    });

    expect(getFingerprint).toHaveBeenCalled();
    expect(mockEmit).toHaveBeenCalledWith(
      "message",
      expect.objectContaining({
        content: "Hola mundo",
        chatUuid: "mocked-chat-uuid",
        visitorId: "mocked-fingerprint",
      })
    );
  });

  it("Should show error if socket is not connected", async () => {
    (io as jest.Mock).mockReturnValue({
      emit: mockEmit,
      on: mockOn,
      disconnect: mockDisconnect,
      connected: false,
    });

    await act(async () => {
      render(
        <SocketProvider>
          <TestComponent />
        </SocketProvider>
      );
    });

    expect(toast.error).toHaveBeenCalledWith(
      "El servicio no está disponible en este momento. Inténtalo más tarde."
    );
    expect(mockEmit).not.toHaveBeenCalled();
  });

  it("Should disconnect socket on unmount", () => {
    const { unmount } = render(
      <SocketProvider>
        <div>Unmount Test</div>
      </SocketProvider>
    );

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
