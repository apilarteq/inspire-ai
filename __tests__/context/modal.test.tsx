// __tests__/context/modal-context.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalProvider, { useModal } from "context/modal";

const TestComponent = () => {
  const { openModal, closeModal } = useModal();

  return (
    <div>
      <button
        onClick={() =>
          openModal(<p data-testid="modal-content">Hello Modal</p>, {
            darkenBackground: false,
            maxSize: 600,
          })
        }
      >
        Open
      </button>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

describe("ModalProvider", () => {
  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) document.body.removeChild(modalRoot);
  });

  it("Should open modal with correct content and close it", async () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    fireEvent.click(screen.getByText("Open"));

    const modalContent = await screen.findByTestId("modal-content");
    expect(modalContent).toHaveTextContent("Hello Modal");

    fireEvent.click(screen.getByText("Close"));

    expect(modalContent).not.toBeInTheDocument();
  });
});
