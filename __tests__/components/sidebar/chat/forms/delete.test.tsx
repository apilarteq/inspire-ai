import { act } from "react";
import { toast } from "sonner";
import { screen, render, fireEvent } from "@testing-library/react";
import DeleteChatForm from "components/sidebar/chat/forms/delete";
import { SelectedChat } from "types/chat";
import { deleteChat } from "utils/api";
import { revalidate } from "@/utils/lib/revalidation";

const mockCloseModal = jest.fn();
const push = jest.fn();

jest.mock("context/modal", () => ({
  useModal: () => ({
    closeModal: mockCloseModal,
  }),
}));

jest.mock("utils/lib/revalidation", () => ({
  revalidate: jest.fn(),
}));

jest.mock("utils/api", () => ({
  deleteChat: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const selectedChat: SelectedChat = {
  _id: "1",
  title: "Chat 1",
};

describe("DeleteChatForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  it("Should render", () => {
    render(<DeleteChatForm chat={selectedChat} currentChatUuid="1" />);
    expect(screen.getByTestId("delete-chat-form")).toBeInTheDocument();
    expect(screen.getByText("Confirmar eliminación")).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });

  it("Should call closeModal when cancel button is clicked", () => {
    render(<DeleteChatForm chat={selectedChat} currentChatUuid="1" />);
    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("Should call deleteChat when delete button is clicked", async () => {
    render(<DeleteChatForm chat={selectedChat} currentChatUuid="1" />);
    await act(async () => {
      fireEvent.click(screen.getByText("Eliminar"));
    });
    expect(deleteChat).toHaveBeenCalledWith(selectedChat._id);
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("Should show toast.error when deleteChat fails", async () => {
    (deleteChat as jest.Mock).mockResolvedValue(false);

    render(<DeleteChatForm chat={selectedChat} currentChatUuid="1" />);
    await act(async () => {
      fireEvent.click(screen.getByText("Eliminar"));
    });
    expect(deleteChat).toHaveBeenCalledWith(selectedChat._id);
    expect(toast.error).toHaveBeenCalledWith("Failed to delete chat");
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("Should show toast.success and revalidate when deleteChat is successful and currentChatUuid is the same as the chat to delete", async () => {
    (deleteChat as jest.Mock).mockResolvedValue(true);

    render(<DeleteChatForm chat={selectedChat} currentChatUuid="1" />);
    await act(async () => {
      fireEvent.click(screen.getByText("Eliminar"));
    });
    expect(deleteChat).toHaveBeenCalledWith(selectedChat._id);
    expect(toast.success).toHaveBeenCalledWith("Chat deleted successfully");
    expect(revalidate).toHaveBeenCalledWith("/");
    expect(push).toHaveBeenCalledWith("/");
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("Should show toast.success and revalidate when deleteChat is successful but currentChatUuid is not the same as the chat to delete", async () => {
    (deleteChat as jest.Mock).mockResolvedValue(true);

    render(<DeleteChatForm chat={selectedChat} currentChatUuid="2" />);
    await act(async () => {
      fireEvent.click(screen.getByText("Eliminar"));
    });
    expect(deleteChat).toHaveBeenCalledWith(selectedChat._id);
    expect(toast.success).toHaveBeenCalledWith("Chat deleted successfully");
    expect(revalidate).toHaveBeenCalledWith("/");
    expect(push).not.toHaveBeenCalled();
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("Should handle specific API error and fall in catch", async () => {
    const mockError = new Error("Network Error");
    mockError.name = "NetworkError";

    (deleteChat as jest.Mock).mockRejectedValue(mockError);

    render(<DeleteChatForm chat={selectedChat} currentChatUuid="1" />);
    await act(async () => {
      fireEvent.click(screen.getByText("Eliminar"));
    });
    expect(deleteChat).toHaveBeenCalledWith(selectedChat._id);
    expect(toast.error).toHaveBeenCalledWith("Failed to delete chat");
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
