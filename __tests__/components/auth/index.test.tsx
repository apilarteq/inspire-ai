import { fireEvent, render, screen } from "@testing-library/react";
import Auth from "components/auth";

jest.mock("components/auth/forms/login", () => {
  const MockLoginForm = () => <div data-testid="login">Login</div>;
  MockLoginForm.displayName = "MockLoginForm";
  return MockLoginForm;
});

jest.mock("components/auth/forms/register", () => {
  const MockRegisterForm = () => <div data-testid="register">Register</div>;
  MockRegisterForm.displayName = "MockRegisterForm";
  return MockRegisterForm;
});

jest.mock("components/auth/tabs", () => {
  const MockAuthTabs = ({
    handleActiveTab,
  }: {
    handleActiveTab: (tab: string) => void;
  }) => (
    <div>
      <button onClick={() => handleActiveTab("login")}>Login Tab</button>
      <button onClick={() => handleActiveTab("register")}>Register Tab</button>
    </div>
  );
  MockAuthTabs.displayName = "MockAuthTabs";
  return MockAuthTabs;
});

describe("Auth", () => {
  it("Should render login", () => {
    render(<Auth openTab="login" />);
    expect(screen.getByTestId("login")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("Should render register", () => {
    render(<Auth openTab="register" />);
    expect(screen.getByTestId("register")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("Should toggle between tabs", () => {
    render(<Auth openTab="login" />);
    fireEvent.click(screen.getByText("Login Tab"));

    expect(screen.getByText("Register Tab")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Register Tab"));
    expect(screen.getByText("Login Tab")).toBeInTheDocument();
  });
});
