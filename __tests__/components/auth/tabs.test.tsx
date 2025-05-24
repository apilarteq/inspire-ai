import { fireEvent, render, screen } from "@testing-library/react";
import AuthTabs from "components/auth/tabs";

const mockHandleActiveTab = jest.fn();

describe("AuthTabs", () => {
  it("Should render", () => {
    render(
      <AuthTabs activeTab="login" handleActiveTab={mockHandleActiveTab} />
    );
    expect(screen.getByText("Iniciar sesion")).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });

  it("Should call handleActiveTab when login tab is clicked", () => {
    render(
      <AuthTabs activeTab="login" handleActiveTab={mockHandleActiveTab} />
    );
    fireEvent.click(screen.getByText("Iniciar sesion"));
    expect(mockHandleActiveTab).toHaveBeenCalledWith("login");
  });

  it("Should call handleActiveTab when register tab is clicked", () => {
    render(
      <AuthTabs activeTab="register" handleActiveTab={mockHandleActiveTab} />
    );
    fireEvent.click(screen.getByText("Registrarse"));
    expect(mockHandleActiveTab).toHaveBeenCalledWith("register");
  });

  it("Should set bg-primary when login tab is clicked", () => {
    render(
      <AuthTabs activeTab="login" handleActiveTab={mockHandleActiveTab} />
    );
    expect(screen.getByText("Iniciar sesion")).toHaveClass("bg-primary");
    expect(screen.getByText("Registrarse")).not.toHaveClass("bg-primary");
  });

  it("Should set bg-primary when register tab is clicked", () => {
    render(
      <AuthTabs activeTab="register" handleActiveTab={mockHandleActiveTab} />
    );
    expect(screen.getByText("Registrarse")).toHaveClass("bg-primary");
    expect(screen.getByText("Iniciar sesion")).not.toHaveClass("bg-primary");
  });
});
