import { screen, render } from "@testing-library/react";
import SearchChatList from "components/sidebar/search/forms/list";
import { Chat } from "types/chat";

const baseProps = {
  filteredChats: [
    { _id: "1", title: "Chat 1", createdAt: "2023-01-01", message: "Message" },
  ] as Chat[] | null,
  loading: false,
  searchTerm: "",
};

jest.mock("components/sidebar/search/forms/item-skeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton" />,
}));

describe("SearchChatList", () => {
  it("Should render", () => {
    render(<SearchChatList {...baseProps} />);
    expect(screen.getByText("Chat 1")).toBeInTheDocument();
  });

  it("Should not found chats by not founding results", () => {
    render(<SearchChatList {...baseProps} filteredChats={null} />);
    expect(
      screen.getByText("No se encontraron chats que coincidan con tu búsqueda.")
    ).toBeInTheDocument();
  });

  it("Should render one skeleton", () => {
    const chats: Chat[] = [
      {
        _id: "1",
        title: "Chat 1",
        createdAt: "2023-01-01",
        message: "Message",
      },
      {
        _id: "2",
        title: "Chat 2",
        createdAt: "2023-01-02",
        message: "Message 2",
      },
      {
        _id: "3",
        title: "Chat 3",
        createdAt: "2023-01-03",
        message: "Message 3",
      },
      {
        _id: "4",
        title: "Chat 4",
        createdAt: "2023-01-04",
        message: "Message 4",
      },
    ];

    render(
      <SearchChatList {...baseProps} filteredChats={chats} loading={true} />
    );
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("Should render three skeletons", () => {
    render(<SearchChatList {...baseProps} loading={true} />);
    expect(screen.getAllByTestId("skeleton").length).toBe(3);
  });
});
