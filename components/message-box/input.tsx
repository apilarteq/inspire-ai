import React, { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref: React.RefObject<HTMLTextAreaElement | null>;
}

const Textarea = ({ ref, ...props }: Props) => {
  return (
    <textarea
      ref={ref}
      className="w-full text-base text-gray-400 resize-none max-h-[6rem] overflow-y-auto outline-none"
      rows={1}
      aria-label="Message input"
      {...props}
    />
  );
};

export default Textarea;
