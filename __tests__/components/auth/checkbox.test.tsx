import { screen, render, fireEvent } from "@testing-library/react";
import Checkboxes from "components/auth/checkbox";

const mockOnFormChange = jest.fn();

describe("Checkboxes", () => {
  it("Should render", () => {
    render(<Checkboxes checked={false} onFormChange={mockOnFormChange} />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("Should show terms and conditions", () => {
    render(
      <Checkboxes checked={false} onFormChange={mockOnFormChange} register />
    );
    expect(screen.getByText("términos y condiciones")).toBeInTheDocument();
  });

  it("Should show login", () => {
    render(<Checkboxes checked={false} onFormChange={mockOnFormChange} />);
    expect(screen.getByText("Recordarme")).toBeInTheDocument();
  });

  it("Should call onFormChange when checkbox is checked", () => {
    render(<Checkboxes checked={false} onFormChange={mockOnFormChange} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockOnFormChange).toHaveBeenCalled();
  });

  it("Should be checked on checked true", () => {
    render(<Checkboxes checked={true} onFormChange={mockOnFormChange} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });
});
