import React from "react";
import Image from "next/image";
import Textarea from "./input";
import Spinner from "../utils/spinner";
import useTextarea from "hooks/useTextarea";
import { useSocket } from "context/socket";

const MessageBoxCard = () => {
  const { handleInput, textareaRef, onPressKey, onSubmit } = useTextarea();
  const { loading } = useSocket();

  return (
    <div className="w-full bg-sidebar rounded-xl p-3 text-left text-gray-300 space-y-5">
      <Textarea
        onInput={handleInput}
        ref={textareaRef}
        onKeyDown={onPressKey}
        placeholder="Type a message..."
      />
      <div className="flex items-center justify-between">
        <div className="w-[35px] h-[35px] rounded-md p-1 cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out">
          <Image alt="Globe icon" src="/globe.svg" width={35} height={35} />
        </div>
        <button type="button" data-testid="submit-button" onClick={onSubmit}>
          <div className="w-[35px] h-[35px] rounded-md hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer p-1">
            {loading ? (
              <Spinner />
            ) : (
              <Image
                alt="Send message icon"
                src="/send.svg"
                width={35}
                height={35}
              />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default MessageBoxCard;
