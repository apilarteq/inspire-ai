import React from "react";
import { useSocket } from "context/socket";

interface Response {
  handleInput: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onPressKey: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

export default function useTextarea(): Response {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { sendMessage } = useSocket();

  React.useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleInput = React.useCallback(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  const onPressKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    try {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(textareaRef.current?.value || "");
        textareaRef.current!.value = "";
        handleInput();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    try {
      if (!textareaRef.current) return;
      sendMessage(textareaRef.current.value);
    } catch (error) {
      console.error(error);
    } finally {
      if (!textareaRef.current) return;
      textareaRef.current.value = "";
      handleInput();
    }
  };

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return {
    handleInput,
    textareaRef,
    onPressKey,
    onSubmit,
    isFocused,
    onFocus,
    onBlur,
  };
}
