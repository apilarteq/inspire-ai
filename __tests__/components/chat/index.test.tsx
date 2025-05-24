import { render, screen } from "@testing-library/react";
import Chat from "components/chat";
import { Message } from "types/message";

const mockSetMessages = jest.fn();
let mockMessages: Message[] = [];

jest.mock("context/global", () => ({
  useGlobal: () => ({
    messages: mockMessages,
    setMessages: mockSetMessages,
  }),
}));

jest.mock("components/messages/user", () => ({
  __esModule: true,
  default: ({ content }: { content: string }) => (
    <div data-testid="user-message">{content}</div>
  ),
}));

jest.mock("components/messages/assistant", () => ({
  __esModule: true,
  default: ({ content }: { content: string }) => (
    <div data-testid="assistant-message">{content}</div>
  ),
}));

const messages: Message[] = [
  {
    _id: "1",
    content: "Hello",
    role: "user",
    createdAt: "2025-05-14T11:28:06.000Z",
  },
  {
    _id: "2",
    content: "Hello user",
    role: "model",
    createdAt: "2025-05-14T11:28:06.000Z",
  },
];

describe("Chat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should not render anything if there are no messages", () => {
    mockMessages = [];
    const { container } = render(<Chat messages={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("Should render the chat container if there are messages", () => {
    mockMessages = messages;
    const { container } = render(<Chat messages={messages} />);
    expect(container.firstChild).not.toBeNull();
  });

  it("Should render messages", () => {
    mockMessages = messages;
    render(<Chat messages={messages} />);
    expect(screen.getByText(messages[0].content)).toBeInTheDocument();
    expect(screen.getByText(messages[1].content)).toBeInTheDocument();
  });

  it("Should call setMessages when messages are received", () => {
    mockMessages = messages;
    render(<Chat messages={messages} />);
    expect(mockSetMessages).toHaveBeenCalledWith(messages);
  });

  it("Should apply opacity transition", () => {
    mockMessages = messages;
    render(<Chat messages={messages} />);
    expect(screen.getByTestId("chat-container")).toHaveClass("opacity-100");
  });
});
