import { act } from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { toast } from "sonner";
import LoginForm from "components/auth/forms/login";

const mockCloseModal = jest.fn();

jest.mock("context/modal", () => ({
  useModal: () => ({
    closeModal: mockCloseModal,
  }),
}));

const mockHandleLogin = jest.fn();

jest.mock("context/auth", () => ({
  useAuth: () => ({
    handleLogin: mockHandleLogin,
  }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("Should render", () => {
    render(<LoginForm handleActiveTab={() => {}} />);
    expect(screen.getByText("Bienvenido de nuevo")).toBeInTheDocument();
    expect(
      screen.getByText("Ingresa tus credenciales para acceder")
    ).toBeInTheDocument();
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });

  it("Should call handleLogin when form is submitted and handle login fails", async () => {
    mockHandleLogin.mockResolvedValue({ success: false, error: "Error" });
    render(<LoginForm handleActiveTab={() => {}} />);

    await act(async () => {
      fireEvent.submit(screen.getByText("Iniciar sesión"));
    });

    expect(mockHandleLogin).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Error");
  });

  it("Should call handleSubmit and fall in catch", async () => {
    mockHandleLogin.mockResolvedValue({ success: false, error: "Error" });
    const mockError = new Error("Network Error");
    mockError.name = "NetworkError";
    mockHandleLogin.mockRejectedValue(mockError);
    render(<LoginForm handleActiveTab={() => {}} />);

    await act(async () => {
      fireEvent.submit(screen.getByText("Iniciar sesión"));
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to login");
  });

  it("Should call handleLogin when form is submitted and everything is ok", async () => {
    mockHandleLogin.mockResolvedValue({ success: true });
    render(<LoginForm handleActiveTab={() => {}} />);

    await act(async () => {
      fireEvent.submit(screen.getByText("Iniciar sesión"));
    });

    expect(mockHandleLogin).toHaveBeenCalled();
    expect(mockCloseModal).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith("Login exitoso");
  });
});
