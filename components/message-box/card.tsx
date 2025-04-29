import React from "react";
import { GlobeAltIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Textarea from "./input";
import Spinner from "../utils/spinner";
import useTextarea from "hooks/useTextarea";
import { useSocket } from "context/socket";

const MessageBoxCard = () => {
  const {
    handleInput,
    textareaRef,
    onPressKey,
    onSubmit,
    isFocused,
    onFocus,
    onBlur,
  } = useTextarea();
  const { loading } = useSocket();

  return (
    <div
      className={`w-full bg-[#18181b] rounded-xl p-3 text-left text-gray-300 space-y-3 ${
        isFocused && "ring-2 ring-secondary"
      }`}
    >
      <Textarea
        onInput={handleInput}
        ref={textareaRef}
        onKeyDown={onPressKey}
        placeholder="Pregunta lo que gustes"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div className="flex items-center justify-between">
        <div className="rounded-md p-1 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
          <GlobeAltIcon className="w-6 h-6 text-secondary" />
        </div>
        <button type="button" data-testid="submit-button" onClick={onSubmit}>
          <div className="rounded-md hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer p-1">
            {loading ? (
              <Spinner />
            ) : (
              <PaperAirplaneIcon className="w-6 h-6 text-secondary" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default MessageBoxCard;
