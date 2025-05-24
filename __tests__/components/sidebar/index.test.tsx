import { render, screen } from "@testing-library/react";
import Sidebar from "components/sidebar";
import { useGlobal } from "context/global";
import { GroupedChats } from "types/chat";

const groupedChats: GroupedChats[] = [
  {
    chats: [
      {
        _id: "1",
        title: "Chat 1",
        createdAt: "2025-05-14T11:28:06.000Z",
        message: "Hello",
      },
      {
        _id: "2",
        title: "Chat 2",
        createdAt: "2025-05-14T11:28:06.000Z",
        message: "Hello",
      },
    ],
    date: "Today",
  },
];

jest.mock("context/global", () => ({
  useGlobal: jest.fn(),
}));

jest.mock("components/sidebar/chat", () => {
  const MockSidebarChats = () => <div data-testid="sidebar-chats" />;
  MockSidebarChats.displayName = "MockSidebarChats";
  return MockSidebarChats;
});

jest.mock("components/sidebar/search", () => {
  const MockSidebarChatSearch = () => <div data-testid="sidebar-chat-search" />;
  MockSidebarChatSearch.displayName = "MockSidebarChatSearch";
  return MockSidebarChatSearch;
});

describe("Sidebar Component", () => {
  const toggleSidebar = jest.fn();
  const setChats = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      toggleSidebar,
      openSidebar: true,
      setChats,
    });

    render(<Sidebar groupedChats={groupedChats} isAuthenticated={true} />);

    expect(screen.getByTestId("sidebar-chats")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-chat-search")).toBeInTheDocument();
  });

  it("Should render the sidebar when openSidebar is true", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      toggleSidebar,
      openSidebar: true,
      setChats,
    });

    render(<Sidebar groupedChats={groupedChats} isAuthenticated={true} />);

    expect(screen.getByTestId("sidebar")).toHaveClass("w-[240px]");
  });

  it("Should not show the sidebar when openSidebar is false", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      toggleSidebar,
      openSidebar: false,
      setChats,
    });

    render(<Sidebar groupedChats={groupedChats} isAuthenticated={true} />);

    expect(screen.getByTestId("sidebar")).toHaveClass("w-0");
  });

  it("Should not show the sidebar when user is not authenticated", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      toggleSidebar,
      openSidebar: true,
      setChats,
    });

    render(<Sidebar groupedChats={groupedChats} isAuthenticated={false} />);

    expect(screen.getByTestId("sidebar")).toHaveClass("w-0");
  });

  it("Should toggle the sidebar when toggleSidebar is called", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      toggleSidebar,
      openSidebar: true,
      setChats,
    });

    render(<Sidebar groupedChats={groupedChats} isAuthenticated={true} />);

    const button = screen.getByTestId("close-sidebar");
    button.click();

    expect(toggleSidebar).toHaveBeenCalled();
  });

  it("should not call setChats if not authenticated", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      toggleSidebar,
      openSidebar: true,
      setChats,
    });

    render(<Sidebar groupedChats={groupedChats} isAuthenticated={false} />);
    expect(setChats).not.toHaveBeenCalled();
  });

  it("should  call setChats if not authenticated", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      toggleSidebar,
      openSidebar: true,
      setChats,
    });

    render(<Sidebar groupedChats={groupedChats} isAuthenticated={true} />);
    expect(setChats).toHaveBeenCalled();
  });
});
