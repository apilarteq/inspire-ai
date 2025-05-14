import React from "react";
import HighlightedMessage from "components/utils/highlighted-message";
import { fromNow } from "utils/functions/date";

interface Props {
  title: string;
  message: string;
  createdAt: string;
  searchTerm: string;
}

const MessageItem = ({ title, message, createdAt, ...props }: Props) => {
  return (
    <div className="ml-3 flex-1 overflow-hidden">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {title}
        </h4>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {fromNow(createdAt)}
        </span>
      </div>
      <HighlightedMessage message={message} searchTerm={props.searchTerm} />
    </div>
  );
};

export default MessageItem;
