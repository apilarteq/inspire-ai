import { render, screen } from "@testing-library/react";
import Header from "components/header";
import { useGlobal } from "context/global";

jest.mock("context/global", () => ({
  useGlobal: jest.fn(),
}));

describe("Header", () => {
  const mockToggleSidebar = jest.fn();

  beforeEach(() => {
    (useGlobal as jest.Mock).mockReturnValue({
      openSidebar: false,
      toggleSidebar: mockToggleSidebar,
    });
  });

  it("Should render", () => {
    render(<Header />);
  });

  it("Should render header title", () => {
    render(<Header />);

    const headerTitle = screen.getByRole("heading", { level: 1 });
    expect(headerTitle).toBeInTheDocument();
    expect(headerTitle).toHaveTextContent("Inspire AI");
  });

  it("Should show open drawer button when openSidebar is false", () => {
    render(<Header />);

    const openSidebarButton = screen.getByTestId("open-sidebar");
    expect(openSidebarButton).toHaveClass("opacity-100");
    expect(openSidebarButton).not.toHaveClass("opacity-0");
  });

  it("Should hide open drawer button when openSidebar is true", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      openSidebar: true,
      toggleSidebar: mockToggleSidebar,
    });

    render(<Header />);

    const openSidebarButton = screen.getByTestId("open-sidebar");
    expect(openSidebarButton).toHaveClass("opacity-0");
    expect(openSidebarButton).not.toHaveClass("opacity-100");
  });
});
