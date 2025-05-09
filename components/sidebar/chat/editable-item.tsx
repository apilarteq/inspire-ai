import React from "react";
import { toast } from "sonner";
import { updateChatTitle } from "utils/api";
import { revalidate } from "utils/lib/revalidation";
import { DropdownAction } from "types/dropdown";
import { useClickOutside } from "@/hooks/useClickOutside";

interface Props {
  uuid: string;
  title: string;
  handleAction: (action: DropdownAction | null) => void;
}

const SidebarChatEditableItem = ({ uuid, title, handleAction }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const ref = useClickOutside<HTMLLIElement>(() => handleAction(null));

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleSave = async () => {
    try {
      if (inputRef.current?.value === title) {
        return;
      }

      const success = await updateChatTitle(
        uuid,
        inputRef.current?.value || title
      );

      if (!success) {
        toast.error("Failed to update chat title");
        return;
      }

      await revalidate("/");
      toast.success("Chat title updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update chat title");
    }
  };

  return (
    <li
      ref={ref}
      key={uuid}
      className="flex items-center rounded-md hover:bg-[#3c3939] p-2 active:bg-[#342f2f] transition-colors duration-200 cursor-pointer relative"
    >
      <input ref={inputRef} type="text" defaultValue={title} className="z-20" />
      <div
        className="fixed w-screen h-screen z-10 inset-0 cursor-default"
        onClick={handleSave}
      />
    </li>
  );
};

export default SidebarChatEditableItem;
