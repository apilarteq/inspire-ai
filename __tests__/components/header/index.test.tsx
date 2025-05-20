import { fireEvent, render, screen } from "@testing-library/react";
import Header from "components/header";

let mockOpenSidebar = false;
const mockToggleSidebar = jest.fn();
const mockHandleLogout = jest.fn();

jest.mock("context/global", () => ({
  useGlobal: () => ({
    openSidebar: mockOpenSidebar,
    toggleSidebar: mockToggleSidebar,
  }),
}));

jest.mock("context/auth", () => ({
  useAuth: () => ({
    handleLogout: mockHandleLogout,
  }),
}));

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOpenSidebar = false;
  });

  it("Should render", () => {
    render(<Header isAuthenticated={false} />);

    expect(screen.getByText("Inspire AI")).toBeInTheDocument();
    expect(screen.getByText("Explorar")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("Should render logout button when user is authenticated", () => {
    render(<Header isAuthenticated={true} />);

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("Should call handleLogout when logout button is clicked", () => {
    render(<Header isAuthenticated={true} />);

    expect(mockHandleLogout).not.toHaveBeenCalled();
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    expect(mockHandleLogout).toHaveBeenCalled();
  });

  it("Should sidebar be closed when openSidebar is false", () => {
    render(<Header isAuthenticated={false} />);
    const headerLeftSide = screen.getByTestId("header-left-side");
    const toggleSidebarButton = screen.getByTestId("open-sidebar");
    expect(headerLeftSide).toHaveClass("flex row");
    expect(headerLeftSide).not.toHaveClass("flex-row-reverse");
    expect(toggleSidebarButton).toHaveClass("opacity-100 duration-200");
    expect(toggleSidebarButton).not.toHaveClass(
      "opacity-0 mr-0 pointer-events-none duration-0"
    );
  });

  it("Should sidebar be open when openSidebar is true", () => {
    mockOpenSidebar = true;

    render(<Header isAuthenticated={false} />);
    const headerLeftSide = screen.getByTestId("header-left-side");
    const toggleSidebarButton = screen.getByTestId("open-sidebar");
    expect(headerLeftSide).toHaveClass("flex-row-reverse");
    expect(headerLeftSide).not.toHaveClass("flex row");
    expect(toggleSidebarButton).toHaveClass(
      "opacity-0 mr-0 pointer-events-none duration-0"
    );
    expect(toggleSidebarButton).not.toHaveClass("opacity-100 duration-200");
  });

  it("Should toggle sidebar when toggleSidebar is called", () => {
    render(<Header isAuthenticated={false} />);
    const toggleSidebarButton = screen.getByTestId("open-sidebar");
    expect(mockToggleSidebar).not.toHaveBeenCalled();
    fireEvent.click(toggleSidebarButton);
    expect(mockToggleSidebar).toHaveBeenCalled();
  });
});
