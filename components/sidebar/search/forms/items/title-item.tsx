import React from "react";
import { fromNow } from "utils/functions/date";

interface Props {
  title: string;
  createdAt: string;
}

const TitleItem = ({ title, createdAt }: Props) => {
  return (
    <div className="flex items-center justify-between ml-3 flex-1 self-center mb-0.5">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
        {title}
      </h4>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {fromNow(createdAt)}
      </span>
    </div>
  );
};

export default TitleItem;
