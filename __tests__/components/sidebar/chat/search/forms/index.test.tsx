import { act } from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { toast } from "sonner";
import SearchForm from "components/sidebar/search/forms";
import { Chat } from "types/chat";
import { searchChats as mockSearchChats } from "utils/api";

jest.mock("utils/api", () => ({
  searchChats: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: { error: jest.fn() },
}));

const mockFilterChats = jest.fn();

const mockAddChats = jest.fn();

jest.mock("context/global", () => ({
  useGlobal: () => ({
    filterChats: mockFilterChats,
    addChats: mockAddChats,
  }),
}));

const mockCloseModal = jest.fn();

jest.mock("context/modal", () => ({
  useModal: () => ({
    closeModal: mockCloseModal,
  }),
}));

jest.mock("components/sidebar/search/forms/input", () => ({
  __esModule: true,
  default: ({
    searchTerm,
    setSearchTerm,
  }: {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }) => (
    <input
      data-testid="search-input"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  ),
}));

jest.mock("components/sidebar/search/forms/list", () => ({
  __esModule: true,
  default: ({
    filteredChats,
    loading,
  }: {
    filteredChats: Chat[];
    loading: boolean;
  }) => (
    <ul>
      {filteredChats?.map((chat, index) => (
        <li key={index}>{chat.title}</li>
      ))}
      {loading && <li data-testid="loading">Loading...</li>}
    </ul>
  ),
}));

describe("SearchForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Should render", () => {
    render(<SearchForm />);
    expect(screen.getByText("Chats recientes")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  it("Should close modal", () => {
    render(<SearchForm />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("Should setLoading to true on type", async () => {
    render(<SearchForm />);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "test" } });
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("Should call searchChats and addChats on debounce", async () => {
    const mockChats = [{ title: "Chat 1" }, { title: "Chat 2" }];
    (mockSearchChats as jest.Mock).mockResolvedValue({ chats: mockChats });

    render(<SearchForm />);
    const input = screen.getByTestId("search-input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "chat" } });
      // esperar al debounce (500ms) + microtasks
      await new Promise((r) => setTimeout(r, 600));
    });

    expect(mockSearchChats).toHaveBeenCalledWith("chat");
    expect(mockFilterChats).toHaveBeenCalledWith("chat");
    expect(mockAddChats).toHaveBeenCalledWith(mockChats);
  });

  it("Should show error toast if searchChats fails", async () => {
    (mockSearchChats as jest.Mock).mockRejectedValue(
      new Error("Network error")
    );

    render(<SearchForm />);
    const input = screen.getByTestId("search-input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "fail" } });
      await new Promise((r) => setTimeout(r, 600));
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to search chats");
  });

  it("Should not call searchChats if searchTerm is empty after debounce", async () => {
    render(<SearchForm />);
    const input = screen.getByTestId("search-input");

    await act(async () => {
      fireEvent.change(input, { target: { value: "" } });
      await new Promise((r) => setTimeout(r, 600));
    });

    expect(mockSearchChats).not.toHaveBeenCalled();
  });
});
