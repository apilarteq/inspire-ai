import React from "react";
import Markdown from "markdown-to-jsx";
import { PuzzlePieceIcon } from "@heroicons/react/24/outline";

interface Props {
  content: string;
}

const AssistantMessage = ({ content }: Props) => {
  return (
    <div className="flex items-start gap-4 max-w-3xl mx-auto">
      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
        <PuzzlePieceIcon className="h-4 w-4 text-zinc-400" />
      </div>
      <div className="flex-1">
        <div className="bg-zinc-900 border border-purple-900/50 mr-1 rounded-2xl rounded-tl-none p-4 text-zinc-200">
          <div className="prose prose-invert max-w-3xl mx-auto">
            <Markdown options={{ wrapper: "div" }} className="markdown">
              {content}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantMessage;
