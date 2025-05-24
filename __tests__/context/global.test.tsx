import { act } from "react";
import { usePathname } from "next/navigation";
import { render, screen } from "@testing-library/react";
import GlobalProvider, { useGlobal } from "context/global";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("GlobalProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue("/chat");
  });

  it("Should render", () => {
    render(
      <GlobalProvider>
        <div>Test Child</div>
      </GlobalProvider>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("Should provide auth context", () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = useGlobal();
      return null;
    };

    render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    );

    expect(contextValue).toEqual({
      openSidebar: true,
      toggleSidebar: expect.any(Function),
      messages: [],
      addMessage: expect.any(Function),
      updateStreamedMessage: expect.any(Function),
      setMessages: expect.any(Function),
      setChats: expect.any(Function),
      chatUuid: null,
      setChatUuid: expect.any(Function),
      filterChats: expect.any(Function),
      addChats: expect.any(Function),
    });
  });

  it("Should set chatUuid from pathname", () => {
    (usePathname as jest.Mock).mockReturnValue("/chat/123");

    let contextValue;
    const TestComponent = () => {
      contextValue = useGlobal();
      return null;
    };

    render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    );

    expect(contextValue!.chatUuid).toBe("123");
  });

  it("Should clear chatUuid when pathname doesn't match", () => {
    (usePathname as jest.Mock).mockReturnValue("/other-route");

    let contextValue;
    const TestComponent = () => {
      contextValue = useGlobal();
      return null;
    };

    render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    );

    expect(contextValue!.chatUuid).toBeNull();
  });

  it("Should set chatUuid on pathname change", () => {
    (usePathname as jest.Mock).mockReturnValue("/chat/123");

    let contextValue;
    const TestComponent = () => {
      contextValue = useGlobal();
      return null;
    };

    const { rerender } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    );

    expect(contextValue!.chatUuid).toBe("123");

    (usePathname as jest.Mock).mockReturnValue("/chat/456");

    rerender(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    );

    expect(contextValue!.chatUuid).toBe("456");
  });

  it("Should toggle sidebar state", () => {
    let contextValue;

    const TestComponent = () => {
      contextValue = useGlobal();
      return null;
    };

    render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    );

    act(() => {
      contextValue!.toggleSidebar();
    });
    expect(contextValue!.openSidebar).toBe(false);

    act(() => {
      contextValue!.toggleSidebar();
    });
    expect(contextValue!.openSidebar).toBe(true);
  });

  it("Should add message", () => {
    let contextValue;

    const TestComponent = () => {
      contextValue = useGlobal();
      return null;
    };

    render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    );

    act(() => {
      contextValue!.addMessage({
        _id: "testId",
        content: "testContent",
        role: "user",
      });
    });

    expect(contextValue!.messages).toEqual([
      {
        _id: "testId",
        content: "testContent",
        role: "user",
      },
    ]);
  });

  it("Should update streamed message", () => {
    let contextValue;

    const TestComponent = () => {
      contextValue = useGlobal();
      return null;
    };

    render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    );

    act(() => {
      contextValue!.addMessage({
        _id: "testId",
        content: "uno",
        role: "user",
      });
    });

    act(() => {
      contextValue!.updateStreamedMessage("testId", "dos");
    });

    expect(contextValue!.messages).toEqual([
      {
        _id: "testId",
        content: "unodos",
        role: "user",
      },
    ]);
  });

  it("Should filter chats correctly", () => {
    let contextValue: ReturnType<typeof useGlobal>;

    const TestComponent = () => {
      contextValue = useGlobal();
      return null;
    };

    render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    );

    const testChats = [
      {
        _id: "1",
        title: "Test Chat 1",
        message: "Hello world",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        title: "Second Chat",
        message: "Hi there",
        createdAt: new Date().toISOString(),
      },
    ];

    act(() => {
      contextValue.setChats(testChats);
    });

    let filteredChats;
    act(() => {
      filteredChats = contextValue!.filterChats("Test");
    });

    expect(filteredChats).toHaveLength(1);
    expect(filteredChats![0].title).toBe("Test Chat 1");

    act(() => {
      filteredChats = contextValue.filterChats("Second");
    });

    expect(filteredChats).toHaveLength(1);
    expect(filteredChats![0].title).toBe("Second Chat");

    act(() => {
      filteredChats = contextValue.filterChats("Non-existent");
    });

    expect(filteredChats).toHaveLength(0);
  });
});
