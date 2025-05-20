import React from "react";
import { usePathname } from "next/navigation";
import { screen, render, fireEvent } from "@testing-library/react";
import MessageBoxCard from "components/message-box/card";
import useTextarea from "hooks/useTextarea";

let loading = false;
const mockOnSubmit = jest.fn();
const mockFocus = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("utils/lib/revalidation", () => ({
  revalidate: jest.fn(),
}));

jest.mock("hooks/useTextarea", () => jest.fn());

jest.mock("context/socket", () => ({
  useSocket: () => ({
    loading,
  }),
}));

jest.mock("components/utils/spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="spinner" />,
}));

describe("MessageBox Card", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    loading = false;

    (useTextarea as jest.Mock).mockReturnValue({
      handleInput: jest.fn(),
      textareaRef: React.createRef(),
      onPressKey: jest.fn(),
      onSubmit: mockOnSubmit,
      isFocused: true,
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      focus: mockFocus,
    });

    (usePathname as jest.Mock).mockReturnValue("/chat");
  });

  it("Should render", () => {
    render(<MessageBoxCard />);
    const messageBoxCard = screen.getByTestId("message-box-card");
    expect(messageBoxCard).toBeInTheDocument();
    expect(messageBoxCard).toHaveClass("ring-2 ring-secondary");
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    expect(mockFocus).toHaveBeenCalled();
  });

  it("Should render with loading true", () => {
    loading = true;

    render(<MessageBoxCard />);
    const messageBoxCard = screen.getByTestId("message-box-card");
    expect(messageBoxCard).toBeInTheDocument();
    expect(messageBoxCard).toHaveClass("ring-2 ring-secondary");
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("Should render with isFocused false and apply ring", () => {
    (useTextarea as jest.Mock).mockReturnValue({
      handleInput: jest.fn(),
      textareaRef: React.createRef(),
      onPressKey: jest.fn(),
      onSubmit: jest.fn(),
      isFocused: false,
      onFocus: mockFocus,
      onBlur: jest.fn(),
      focus: jest.fn(),
    });

    render(<MessageBoxCard />);
    const messageBoxCard = screen.getByTestId("message-box-card");
    expect(messageBoxCard).toBeInTheDocument();
    expect(messageBoxCard).not.toHaveClass("ring-2 ring-secondary");
  });

  it("Should call onSubmit when submit button is clicked", () => {
    render(<MessageBoxCard />);
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("Should call focus when pathname changes", () => {
    (usePathname as jest.Mock).mockReturnValue("/chat");
    const { rerender } = render(<MessageBoxCard />);
    expect(mockFocus).toHaveBeenCalledTimes(1);
    (usePathname as jest.Mock).mockReturnValue("/chat/1");
    rerender(<MessageBoxCard />);
    expect(mockFocus).toHaveBeenCalledTimes(2);
  });
});
