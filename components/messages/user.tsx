import React from "react";

interface Props {
  content: string;
}

const UserMessage = ({ content }: Props) => {
  return (
    <div className="bg-header p-3 rounded-xl max-w-3/4">
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export default UserMessage;
