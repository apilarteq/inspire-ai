import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import SidebarChatEditableItem from "components/sidebar/chat/editable-item";
import { updateChatTitle } from "utils/api";
import { revalidate } from "utils/lib/revalidation";

jest.mock("utils/lib/revalidation", () => ({
  revalidate: jest.fn(),
}));

jest.mock("utils/api", () => ({
  updateChatTitle: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("SidebarChatEditableItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  const baseProps = {
    uuid: "1",
    title: "Chat 1",
    handleAction: jest.fn(),
  };

  it("Should render", () => {
    render(<SidebarChatEditableItem {...baseProps} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue(baseProps.title);
  });

  it("Should not call updateChatTitle when save is clicked, because title is the same", () => {
    (updateChatTitle as jest.Mock).mockResolvedValue(true);

    render(<SidebarChatEditableItem {...baseProps} />);
    const outside = screen.getByTestId("outside-clickable");
    fireEvent.click(outside);
    expect(updateChatTitle).not.toHaveBeenCalled();
  });

  it("Should call updateChatTitle when save is clicked, because title is different", () => {
    (updateChatTitle as jest.Mock).mockResolvedValue(true);

    render(<SidebarChatEditableItem {...baseProps} />);
    const outside = screen.getByTestId("outside-clickable");
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Chat Title" } });
    fireEvent.click(outside);
    expect(updateChatTitle).toHaveBeenCalled();
  });

  it("Should show toast error when updateChatTitle fails", async () => {
    (updateChatTitle as jest.Mock).mockResolvedValue(false);

    render(<SidebarChatEditableItem {...baseProps} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Chat Title" } });

    const outside = screen.getByTestId("outside-clickable");
    fireEvent.click(outside);

    await Promise.resolve();

    expect(updateChatTitle).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Failed to update chat title");
  });

  it("Should call revalidate and show success toast when update is successful", async () => {
    (updateChatTitle as jest.Mock).mockImplementation(async () => {
      await Promise.resolve();
      return true;
    });

    (revalidate as jest.Mock).mockImplementation(async () => {
      await Promise.resolve();
    });

    render(<SidebarChatEditableItem {...baseProps} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Chat Title" } });

    const outside = screen.getByTestId("outside-clickable");
    fireEvent.click(outside);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Chat title updated successfully"
      );
    });

    expect(updateChatTitle).toHaveBeenCalledWith(
      baseProps.uuid,
      "New Chat Title"
    );
    expect(revalidate).toHaveBeenCalledWith("/");
  });

  it("Should handle specific API errors and fall in catch", async () => {
    const mockError = new Error("Network Error");
    mockError.name = "NetworkError";

    (updateChatTitle as jest.Mock).mockRejectedValue(mockError);

    render(<SidebarChatEditableItem {...baseProps} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New Chat Title" } });

    const outside = screen.getByTestId("outside-clickable");
    fireEvent.click(outside);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to update chat title");
    });
  });
});
