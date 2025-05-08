/**
 * Truncates a string to the specified number of characters and adds ellipsis if needed.
 * @param input - The input string to truncate.
 * @param charactersToDelete - The number of characters to keep before truncating.
 * @returns The truncated string with ellipsis if truncated.
 */
export const truncate = (input: string, charactersToDelete: number): string => {
  if (input.length > charactersToDelete) {
    return input.substring(0, charactersToDelete) + "...";
  }
  return input;
};
