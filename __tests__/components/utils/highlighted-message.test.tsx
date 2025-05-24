import { render, screen } from "@testing-library/react";
import HighlightedMessage from "components/utils/highlighted-message";

describe("HighlightedMessage", () => {
  it("Should render fallback when search term is not found", () => {
    render(
      <HighlightedMessage
        message="This is a simple message that does not include the term."
        searchTerm="unknown"
      />
    );

    const highlighted = screen.getByTestId("highlighted-message");
    expect(highlighted).toHaveTextContent(
      "This is a simple message that does not include the term..."
    );
    expect(highlighted.querySelector("span")).toBeNull();
  });

  it("Should render highlighted match when search term is present", () => {
    render(
      <HighlightedMessage
        message="This is a test message containing the word highlight."
        searchTerm="highlight"
      />
    );

    const highlighted = screen.getByTestId("highlighted-message");
    expect(highlighted).toHaveTextContent("highlight");

    const strongMatch = highlighted.querySelector("span");
    expect(strongMatch).toHaveTextContent("highlight");
    expect(strongMatch).toHaveClass("font-semibold");
  });

  it("Should show ellipsis when before context is longer than after", () => {
    const message =
      "A long message that starts with something and then includes the searchterm in the middle.";
    const searchTerm = "searchterm";

    render(<HighlightedMessage message={message} searchTerm={searchTerm} />);
    const highlighted = screen.getByTestId("highlighted-message");

    expect(highlighted.textContent?.startsWith("...")).toBe(true);
    expect(highlighted).toHaveTextContent(searchTerm);
  });

  it("Should handles empty message gracefully", () => {
    render(<HighlightedMessage message="" searchTerm="anything" />);
    const highlighted = screen.getByTestId("highlighted-message");
    expect(highlighted.textContent).toBe("...");
  });

  it("Should handles empty search term by showing truncated start", () => {
    render(
      <HighlightedMessage
        message="This is the message that should be truncated at 60 characters."
        searchTerm=""
      />
    );
    const highlighted = screen.getByTestId("highlighted-message");
    expect(highlighted.textContent).toContain("...");
  });
});
