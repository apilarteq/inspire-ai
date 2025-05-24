import { screen, render, fireEvent } from "@testing-library/react";
import SidebarChatItem from "components/sidebar/chat/item";
import { Chat } from "types/chat";

jest.mock("components/sidebar/chat/dropdown-options", () => {
  const MockSidebarChatDropdownOptions = () => (
    <div data-testid="dropdown-options" />
  );
  MockSidebarChatDropdownOptions.displayName = "MockSidebarChatDropdownOptions";
  return MockSidebarChatDropdownOptions;
});

const chat: Chat = {
  _id: "1",
  title: "Chat 1",
  createdAt: "2025-05-14T11:28:06.000Z",
  message: "Hello",
};

describe("SidebarChatItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseProps = {
    uuid: chat._id,
    title: chat.title,
    currentUuid: chat._id,
    selectedUuid: chat._id,
    handleClickOutside: jest.fn(),
    handleAction: jest.fn(),
    handleSelectChat: jest.fn(),
  };

  it("Should render", () => {
    render(<SidebarChatItem {...baseProps} />);
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
  });

  it("Should render dropdown options when selectedUuid matches uuid", () => {
    render(<SidebarChatItem {...baseProps} />);
    expect(screen.getByTestId("dropdown-options")).toBeInTheDocument();
  });

  it("Should not render dropdown options when selectedUuid does not match uuid", () => {
    render(<SidebarChatItem {...baseProps} selectedUuid="2" />);
    expect(screen.queryByTestId("dropdown-options")).not.toBeInTheDocument();
  });

  it("Should show background when selectedUuid matches uuid", () => {
    render(<SidebarChatItem {...baseProps} />);
    expect(screen.getByTestId("chat-item")).toHaveClass("bg-purple-900/30");
  });

  it("Should not show background when selectedUuid does not match url chat uuid", () => {
    render(<SidebarChatItem {...baseProps} currentUuid="2" />);
    expect(screen.getByTestId("chat-item")).not.toHaveClass("bg-purple-900/30");
  });

  it("Should calls handleSelectChat when options button is clicked", () => {
    render(<SidebarChatItem {...baseProps} />);

    const optionsButton = screen.getByRole("button", { hidden: true });

    fireEvent.click(optionsButton);

    expect(baseProps.handleSelectChat).toHaveBeenCalledWith({
      _id: baseProps.uuid,
      title: baseProps.title,
    });
  });
});
