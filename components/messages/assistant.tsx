import Markdown from "markdown-to-jsx";
import React from "react";

interface Props {
  content: string;
}

const AssistantMessage = ({ content }: Props) => {
  return (
    <div className="prose prose-invert max-w-3xl mx-auto pl-0.5">
      <Markdown>{content}</Markdown>
    </div>
  );
};

export default AssistantMessage;
