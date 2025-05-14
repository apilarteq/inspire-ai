import React from "react";
import { getHighlightedSnippet, truncate } from "utils/functions/text";

interface Props {
  message: string;
  searchTerm: string;
}

const HighlightedMessage = ({ message, searchTerm }: Props) => {
  const snippet = getHighlightedSnippet(message, searchTerm);

  if (snippet.match === "") {
    return (
      <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
        {snippet.before}
      </span>
    );
  }

  return (
    <span className="text-sm text-gray-500 dark:text-gray-400">
      {snippet.before.length > snippet.after.length && "..."}
      {snippet.before}
      <span className="text-white dark:text-white font-semibold">
        {snippet.match}
      </span>
      {truncate(snippet.after, 25)}
    </span>
  );
};

export default HighlightedMessage;
