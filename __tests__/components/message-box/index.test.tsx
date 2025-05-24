import { render, screen } from "@testing-library/react";
import MessageBox from "components/message-box";
import { useGlobal } from "context/global";
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
    content: "Hello user",
    createdAt: "2025-05-14T11:28:06.000Z",
  },
];

jest.mock("context/global", () => ({
  useGlobal: jest.fn(),
}));

jest.mock("utils/lib/revalidation", () => ({
  revalidate: jest.fn(),
}));

jest.mock("components/message-box/title", () => ({
  __esModule: true,
  default: () => <div data-testid="message-box-title" />,
}));

describe("MessageBox", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render", () => {
    (useGlobal as jest.Mock).mockReturnValue({ messages: [] });

    render(<MessageBox />);
    const messageBoxContainer = screen.getByTestId("message-box");
    expect(messageBoxContainer).toBeInTheDocument();
    expect(messageBoxContainer).toHaveClass(
      "absolute bottom-1/2 translate-y-1/2"
    );
    expect(screen.getByTestId("message-box-title")).toBeInTheDocument();
  });

  it("Should render with messages behavior", () => {
    (useGlobal as jest.Mock).mockReturnValue({ messages });

    render(<MessageBox />);
    const messageBoxContainer = screen.getByTestId("message-box");
    expect(messageBoxContainer).toBeInTheDocument();
    expect(messageBoxContainer).toHaveClass("sticky bottom-0");
  });
});
