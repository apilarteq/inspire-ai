import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "components/utils/modal";

describe("Modal component", () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    options: {
      darkenBackground: true,
      maxSize: 500,
    },
    children: <div data-testid="modal-content">Modal Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render modal content when open is true", () => {
    render(<Modal {...defaultProps} />);

    const content = screen.getByTestId("modal-content");
    expect(content).toBeInTheDocument();
  });

  it("should not apply pointer events when open is false", () => {
    render(<Modal {...defaultProps} open={false} />);
    const wrapper = screen.getByRole("dialog");
    expect(wrapper).toHaveStyle({ pointerEvents: "none" });
  });

  it("should call onClose when clicking on the backdrop", () => {
    render(
      <div data-testid="backdrop" onClick={defaultProps.onClose}>
        <Modal {...defaultProps} />
      </div>
    );

    const backdrop = screen.getByTestId("backdrop");
    fireEvent.click(backdrop!);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("should NOT call onClose when clicking inside the modal", () => {
    render(<Modal {...defaultProps} />);

    const modalContainer = screen.getByTestId("modal-content");
    fireEvent.click(modalContainer);

    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it("should add dark background when darkenBackground is true", () => {
    render(<Modal {...defaultProps} />);

    const overlay = document.querySelector(".fixed.inset-0");
    expect(overlay).toHaveClass("bg-primary/75");
  });

  it("should not add dark background when darkenBackground is false", () => {
    render(
      <Modal
        {...defaultProps}
        options={{ ...defaultProps.options, darkenBackground: false }}
      />
    );

    const overlay = document.querySelector(".fixed.inset-0");
    expect(overlay).not.toHaveClass("bg-primary/75");
  });
});
