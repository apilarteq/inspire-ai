import { act } from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { toast } from "sonner";
import RegisterForm from "components/auth/forms/register";

const mockCloseModal = jest.fn();

jest.mock("context/modal", () => ({
  useModal: () => ({
    closeModal: mockCloseModal,
  }),
}));

const mockHandleRegister = jest.fn();

jest.mock("context/auth", () => ({
  useAuth: () => ({
    handleRegister: mockHandleRegister,
  }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("Should render", () => {
    render(<RegisterForm handleActiveTab={() => {}} />);
    expect(screen.getByText("Crear una cuenta")).toBeInTheDocument();
    expect(
      screen.getByText("¡Tus chats sin autenticar te esperan por 30 días!")
    ).toBeInTheDocument();
    expect(screen.getByText("Registrarse")).toBeInTheDocument();
  });

  it("Should call handleRegister when form is submitted and handle register fails", async () => {
    mockHandleRegister.mockResolvedValue({ success: false, error: "Error" });
    render(<RegisterForm handleActiveTab={() => {}} />);

    await act(async () => {
      fireEvent.submit(screen.getByText("Registrarse"));
    });

    expect(mockHandleRegister).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Error");
  });

  it("Should call handleSubmit and fall in catch", async () => {
    mockHandleRegister.mockResolvedValue({ success: false, error: "Error" });
    const mockError = new Error("Network Error");
    mockError.name = "NetworkError";
    mockHandleRegister.mockRejectedValue(mockError);
    render(<RegisterForm handleActiveTab={() => {}} />);

    await act(async () => {
      fireEvent.submit(screen.getByText("Registrarse"));
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to register");
  });

  it("Should call handleRegister when form is submitted and everything is ok", async () => {
    mockHandleRegister.mockResolvedValue({ success: true });
    render(<RegisterForm handleActiveTab={() => {}} />);

    await act(async () => {
      fireEvent.submit(screen.getByText("Registrarse"));
    });

    expect(mockHandleRegister).toHaveBeenCalled();
    expect(mockCloseModal).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith(
      "Usuario registrado exitosamente"
    );
  });
});
