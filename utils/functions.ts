/*
 * @param {string} string {number} number
 * Description: This function is used to truncate text
 * @return {string}
 */
export const truncate = (input: string, charactersToDelete: number) => {
  if (input.length > charactersToDelete) {
    return input.substring(0, charactersToDelete) + "...";
  }
  return input;
};
