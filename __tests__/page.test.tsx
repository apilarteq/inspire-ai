import { render, screen } from "@testing-library/react";
import Home from "app/page";
import { Message } from "types/message";

const messages: Message[] = [
  {
    _id: "1",
    role: "user",
    content: "Hello",
    createdAt: "2025-05-14T11:28:06.000Z",
  },
  {
    _id: "2",
    role: "model",
    content: "Hello my friend",
    createdAt: "2025-05-14T11:28:06.000Z",
  },
];

jest.mock("context/global", () => ({
  useGlobal: () => ({
    messages,
    setMessages: jest.fn(),
  }),
}));

describe("Home", () => {
  it("Should render", () => {
    render(<Home />);

    expect(screen.getByText(messages[0].content)).toBeInTheDocument();
    expect(screen.getByText(messages[1].content)).toBeInTheDocument();
  });
});
