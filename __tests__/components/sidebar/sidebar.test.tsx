import { fireEvent, render, screen } from "@testing-library/react";
import SidebarClient from "components/sidebar";
import { useGlobal } from "context/global";

jest.mock("context/global", () => ({
  useGlobal: jest.fn(),
}));

describe("Sidebar Client", () => {
  const mockToggleSidebar = jest.fn();

  beforeEach(() => {
    (useGlobal as jest.Mock).mockReturnValue({
      openSidebar: false,
      toggleSidebar: mockToggleSidebar,
    });
  });

  it("Should render", async () => {
    render(<SidebarClient chats={[]} />);
  });

  it("Should show sidebar", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      openSidebar: true,
      toggleSidebar: mockToggleSidebar,
    });

    render(<SidebarClient chats={[]} />);

    const aside = screen.getByTestId("sidebar");
    expect(aside).toBeInTheDocument();
    expect(aside).toHaveClass("w-[240px] translate-x-0 opacity-100");
    expect(aside).not.toHaveClass("w-0 -translate-x-full opacity-0");
  });

  it("Should hide sidebar", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      openSidebar: false,
      toggleSidebar: mockToggleSidebar,
    });

    render(<SidebarClient chats={[]} />);

    const aside = screen.getByTestId("sidebar");
    expect(aside).toBeInTheDocument();
    expect(aside).toHaveClass("w-0 -translate-x-full opacity-0");
    expect(aside).not.toHaveClass("w-[240px] translate-x-0 opacity-100");
  });

  it("Should toggle sidebar", () => {
    (useGlobal as jest.Mock).mockReturnValue({
      openSidebar: false,
      toggleSidebar: mockToggleSidebar,
    });

    render(<SidebarClient chats={[]} />);

    const closeSidebarButton = screen.getByTestId("close-sidebar");
    expect(closeSidebarButton).toBeInTheDocument();
    fireEvent.click(closeSidebarButton);
    expect(mockToggleSidebar).toHaveBeenCalled();
  });

  it("Should no render chats", () => {
    render(<SidebarClient chats={[]} />);

    const chats = screen.queryAllByRole("listitem");
    expect(chats).toHaveLength(0);
  });

  it("Should render chats", () => {
    render(
      <SidebarClient
        chats={[
          { uuid: "1", title: "Chat 1", createdAt: new Date().toISOString() },
        ]}
      />
    );

    const chats = screen.queryAllByRole("listitem");
    expect(chats).toHaveLength(1);
  });
});
