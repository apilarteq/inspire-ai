import { screen, render, fireEvent } from "@testing-library/react";
import SidebarChats from "components/sidebar/chat";
import { GroupedChats, SelectedChat } from "types/chat";

jest.mock("context/global", () => ({
  useGlobal: () => ({
    chatUuid: "1",
  }),
}));

const mockOpenModal = jest.fn();

jest.mock("context/modal", () => ({
  useModal: () => ({
    openModal: mockOpenModal,
  }),
}));

jest.mock("components/sidebar/chat/list", () => {
  const MockComponent = (props: {
    chats: SelectedChat[];
    handleAction: (action: string) => void;
  }) => {
    return (
      <div data-testid="sidebar-chat-list">
        {props.chats.map((chat: SelectedChat) => (
          <div key={chat._id} onClick={() => props.handleAction("delete")}>
            {chat.title}
          </div>
        ))}
      </div>
    );
  };
  MockComponent.displayName = "MockSidebarChatList";
  return MockComponent;
});

jest.mock("components/sidebar/chat/forms/delete", () => {
  const MockDeleteChatForm = () => <div data-testid="delete-chat-form" />;
  MockDeleteChatForm.displayName = "MockDeleteChatForm";
  return MockDeleteChatForm;
});

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

describe("SidebarChats", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render", () => {
    render(<SidebarChats groupedChats={groupedChats} />);

    expect(screen.getByText(groupedChats[0].date)).toBeInTheDocument();
  });

  it("should render 'Still no chats' when chat list is empty", () => {
    render(<SidebarChats groupedChats={[]} />);
    expect(screen.getByText("Still no chats")).toBeInTheDocument();
  });

  it("should call openModal when delete action is triggered", () => {
    render(<SidebarChats groupedChats={groupedChats} />);

    const chatItem = screen.getByText(groupedChats[0].chats[0].title);
    fireEvent.click(chatItem);

    expect(mockOpenModal).toHaveBeenCalledWith(expect.any(Object));
  });
});
