import { screen, render } from "@testing-library/react";
import SearchChatItem from "components/sidebar/search/forms/item";
import { Chat } from "types/chat";

const baseProps = {
  chat: {
    _id: "1",
    title: "Chat 1",
    createdAt: "2023-01-01",
    message: "Message",
  } as Chat,
  searchTerm: "",
};

describe("SearchChatItem", () => {
  it("Should render", () => {
    render(<SearchChatItem {...baseProps} />);
    expect(screen.getByText("Chat 1")).toBeInTheDocument();
  });

  it("Should render message", () => {
    render(<SearchChatItem {...baseProps} />);
    expect(screen.getByTestId("highlighted-message")).toBeInTheDocument();
  });

  it("Should not render message", () => {
    render(
      <SearchChatItem
        {...baseProps}
        chat={{
          _id: "1",
          title: "Chat 1",
          createdAt: "2023-01-01",
          message: "",
        }}
      />
    );
    expect(screen.queryByTestId("highlighted-message")).not.toBeInTheDocument();
  });
});
