import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";

interface Props {
  content: string;
}

const UserMessage = ({ content }: Props) => {
  return (
    <div className="flex items-start gap-4 max-w-3xl mx-auto">
      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center mr-1 justify-center flex-shrink-0">
        <UserIcon className="h-4 w-4 text-zinc-400" />
      </div>
      <div className="flex-1">
        <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4 text-zinc-200">
          {content}
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
