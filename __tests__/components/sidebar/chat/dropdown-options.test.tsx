import { screen, render, fireEvent } from "@testing-library/react";
import SidebarChatOptions from "components/sidebar/chat/dropdown-options";

const handleClickOutside = jest.fn();
const handleAction = jest.fn();

describe("SidebarChatOptions", () => {
  it("Should render", () => {
    render(
      <SidebarChatOptions
        handleClickOutside={handleClickOutside}
        handleAction={handleAction}
      />
    );

    expect(screen.getByTestId("dropdown-options")).toBeInTheDocument();
    expect(screen.getByText("Cambiar nombre")).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });

  it("should call handleAction with 'rename' when clicking 'Cambiar nombre'", () => {
    render(
      <SidebarChatOptions
        handleAction={handleAction}
        handleClickOutside={handleClickOutside}
      />
    );

    fireEvent.click(screen.getByText("Cambiar nombre"));
    expect(handleAction).toHaveBeenCalledWith("rename");
  });

  it("should call handleAction with 'delete' when clicking 'Eliminar'", () => {
    render(
      <SidebarChatOptions
        handleAction={handleAction}
        handleClickOutside={handleClickOutside}
      />
    );

    fireEvent.click(screen.getByText("Eliminar"));
    expect(handleAction).toHaveBeenCalledWith("delete");
  });

  it("should call handleClickOutside when clicking outside the component", () => {
    render(
      <div>
        <SidebarChatOptions
          handleAction={handleAction}
          handleClickOutside={handleClickOutside}
        />
        <div data-testid="outside">Outside element</div>
      </div>
    );

    fireEvent.pointerDown(screen.getByTestId("outside"));
    expect(handleClickOutside).toHaveBeenCalled();
  });
});
