import { screen, render, fireEvent } from "@testing-library/react";
import AuthInputs from "components/auth/inputs";
import { FormData } from "types/auth";

const mockOnFormChange = jest.fn();

const baseProps = {
  formData: { username: "juan", password: "juan" } as FormData,
  onFormChange: mockOnFormChange,
};

describe("AuthInputs", () => {
  it("Should render", () => {
    render(<AuthInputs {...baseProps} />);
    expect(screen.getByText("Nombre de usuario")).toBeInTheDocument();
    expect(screen.getByText("Contraseña")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toHaveValue(
      baseProps.formData.password
    );
  });

  it("Should toggle password", () => {
    render(<AuthInputs {...baseProps} />);
    const input = screen.getByTestId("password-input");
    expect(input).toHaveAttribute("placeholder", "•••••••••••");
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(input).toHaveAttribute("placeholder", "my-password");
    fireEvent.click(button);
    expect(input).toHaveAttribute("placeholder", "•••••••••••");
  });

  it("calls onFormChange when input values change", () => {
    render(<AuthInputs {...baseProps} />);
    const usernameInput = screen.getByLabelText("Nombre de usuario");
    const passwordInput = screen.getByTestId("password-input");

    fireEvent.change(usernameInput, { target: { value: "newuser" } });
    fireEvent.change(passwordInput, { target: { value: "newpassword" } });

    expect(mockOnFormChange).toHaveBeenCalledTimes(2);
  });
});
