/**
 * Truncates a string to the specified number of characters and adds ellipsis if needed.
 * @param input - The input string to truncate.
 * @param charactersToDelete - The number of characters to keep before truncating.
 * @returns The truncated string with ellipsis if truncated.
 */
export function truncate(input: string, charactersToDelete: number): string {
  if (input.length > charactersToDelete) {
    return input.substring(0, charactersToDelete) + "...";
  }
  return input;
}

/**
 * Returns a snippet of the message with the search term highlighted.
 * @param message - The message to extract the snippet from.
 * @param searchTerm - The term to highlight in the message.
 * @param contextLength - The number of characters to include before and after the search term.
 * @returns An object containing the snippet before, the highlighted search term, and the snippet after the search term.
 */
export function getHighlightedSnippet(
  message: string,
  searchTerm: string,
  contextLength = 30
): {
  before: string;
  match: string;
  after: string;
} {
  const lowerMessage = message.toLowerCase();
  const lowerSearch = searchTerm.toLowerCase();
  const index = lowerSearch.length > 0 ? lowerMessage.indexOf(lowerSearch) : -1;

  if (index === -1)
    return { before: message.slice(0, 60) + "...", match: "", after: "" }; // fallback

  const start = Math.max(0, index - contextLength);
  const end = Math.min(
    message.length,
    index + searchTerm.length + contextLength
  );
  const before = message.slice(start, index);
  const match = message.slice(index, index + searchTerm.length);
  const after = message.slice(index + searchTerm.length, end);

  return { before, match, after };
}
