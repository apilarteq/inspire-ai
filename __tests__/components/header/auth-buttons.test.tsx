import { screen, render, fireEvent } from "@testing-library/react";
import Auth from "components/auth";
import HeaderAuthButtons from "components/header/auth-buttons";

const mockOpenModal = jest.fn();

jest.mock("context/modal", () => ({
  useModal: () => ({
    openModal: mockOpenModal,
  }),
}));

jest.mock("components/auth", () => {
  const MockAuth = () => <div data-testid="auth">Auth</div>;
  MockAuth.displayName = "MockAuth";
  return MockAuth;
});

describe("Header Auth Buttons", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render", () => {
    render(<HeaderAuthButtons />);

    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("Should call openModal with login parameter when Sign In button is clicked", () => {
    render(<HeaderAuthButtons />);
    const signInButton = screen.getByText("Sign in");
    expect(mockOpenModal).not.toHaveBeenCalled();
    fireEvent.click(signInButton);
    expect(mockOpenModal).toHaveBeenCalledWith(<Auth openTab="login" />);
  });

  it("Should call openModal with register parameter when Sign Up button is clicked", () => {
    render(<HeaderAuthButtons />);
    const signUpButton = screen.getByText("Sign up");
    expect(mockOpenModal).not.toHaveBeenCalled();
    fireEvent.click(signUpButton);
    expect(mockOpenModal).toHaveBeenCalledWith(<Auth openTab="register" />);
  });
});
