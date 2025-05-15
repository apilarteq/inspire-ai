import { Chat } from "@/types/chat";
import { render, screen } from "@testing-library/react";
import SidebarChatList from "components/sidebar/chat/list";

jest.mock("components/sidebar/chat/item", () => {
  const MockSidebarChatItem = (props: { title: string }) => {
    return <li data-testid="sidebar-chat-item">{props.title}</li>;
  };
  MockSidebarChatItem.displayName = "MockSidebarChatItem";
  return MockSidebarChatItem;
});

jest.mock("components/sidebar/chat/editable-item", () => {
  const MockSidebarChatEditableItem = (props: { title: string }) => (
    <li data-testid="sidebar-chat-editable-item">{props.title}</li>
  );
  MockSidebarChatEditableItem.displayName = "MockSidebarChatEditableItem";
  return MockSidebarChatEditableItem;
});

describe("SidebarChatList", () => {
  const chats: Chat[] = [
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
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseProps = {
    selectedUuid: "",
    action: null,
    handleClickOutside: jest.fn(),
    handleAction: jest.fn(),
    handleSelectChat: jest.fn(),
  };

  it("Should render", () => {
    render(<SidebarChatList {...baseProps} chats={chats} />);
    expect(screen.getByText(chats[0].title)).toBeInTheDocument();
    expect(screen.getByText(chats[1].title)).toBeInTheDocument();
  });

  it("renders SidebarChatEditableItem when chat is selected and action is rename", () => {
    render(
      <SidebarChatList
        chats={chats}
        {...baseProps}
        selectedUuid="1"
        action="rename"
      />
    );

    const editableItems = screen.getAllByTestId("sidebar-chat-editable-item");
    expect(editableItems).toHaveLength(1);
    expect(editableItems[0]).toHaveTextContent("Chat 1");
  });

  it("calls handleAction(null) when mounted and when chats change", () => {
    const handleActionMock = jest.fn();

    const { rerender } = render(
      <SidebarChatList
        chats={chats}
        {...baseProps}
        handleAction={handleActionMock}
      />
    );

    expect(handleActionMock).toHaveBeenCalledWith(null);

    // Simulate chats change
    const newChats = [
      ...chats,
      {
        _id: "3",
        title: "Chat 3",
        createdAt: "2025-05-14T00:00:00.000Z",
        message: "Yo",
      },
    ];

    rerender(
      <SidebarChatList
        chats={newChats}
        {...baseProps}
        handleAction={handleActionMock}
      />
    );

    expect(handleActionMock).toHaveBeenCalledTimes(2);
  });
});
