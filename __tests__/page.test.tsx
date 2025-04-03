import { Message } from "@/types/message";
import { render, waitFor, screen } from "@testing-library/react";
import Home from "app/page";
import { loadMessages } from "utils/actions";

jest.mock("utils/actions", () => ({
  loadMessages: jest.fn(),
}));
describe("Home", () => {
  const mockMessages: Message[] = [
    {
      uuid: "1",
      role: "user",
      content: "Hello",
      createdAt: new Date().toISOString(),
    },
    {
      uuid: "2",
      role: "assistant",
      content: "Hello there friend!",
      createdAt: new Date().toISOString(),
    },
    {
      uuid: "3",
      role: "user",
      content: "aAa",
      createdAt: new Date().toISOString(),
    },
    {
      uuid: "4",
      role: "assistant",
      content: "bBb",
      createdAt: new Date().toISOString(),
    },
    {
      uuid: "5",
      role: "user",
      content: "cCc",
      createdAt: new Date().toISOString(),
    },
    {
      uuid: "6",
      role: "assistant",
      content: "dDd",
      createdAt: new Date().toISOString(),
    },
  ];

  beforeEach(() => {
    (loadMessages as jest.Mock).mockResolvedValue(mockMessages);
  });

  it("Should render", async () => {
    render(await Home());

    await waitFor(() => {
      expect(screen.getByText(mockMessages[0].content)).toBeInTheDocument();
      expect(screen.getByText(mockMessages[1].content)).toBeInTheDocument();
    });
  });
});
