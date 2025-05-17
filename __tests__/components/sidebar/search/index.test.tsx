import { screen, render, fireEvent } from "@testing-library/react";
import SidebarChatSearch from "components/sidebar/search";

const mockOpenModal = jest.fn();

jest.mock("context/modal", () => ({
  useModal: () => ({
    openModal: mockOpenModal,
  }),
}));

jest.mock("components/sidebar/search/forms", () => {
  const MockSearchForm = () => {
    return <div data-testid="sidebar-chat-item">Mocked SearchForm</div>;
  };
  MockSearchForm.displayName = "MockSearchForm";
  return MockSearchForm;
});

describe("SidebarChatSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render", () => {
    render(<SidebarChatSearch />);
    const button = screen.getByTestId("open-search-modal");
    expect(button).toBeInTheDocument();
  });

  it("Should openModal on click button", () => {
    render(<SidebarChatSearch />);
    const button = screen.getByTestId("open-search-modal");
    fireEvent.click(button);
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
    expect(mockOpenModal.mock.calls[0][1]).toEqual({ darkenBackground: false });

    const firstArg = mockOpenModal.mock.calls[0][0];
    expect(typeof firstArg).toBe("object");
    expect(firstArg.type.name).toBe("MockSearchForm");
  });
});
