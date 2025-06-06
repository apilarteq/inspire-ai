import React from "react";
import { useClickOutside } from "hooks/useClickOutside";
import { DropdownAction } from "types/dropdown";

interface Props {
  handleClickOutside: () => void;
  handleAction: (action: DropdownAction) => void;
}

const SidebarChatOptions = ({ handleClickOutside, handleAction }: Props) => {
  const ref = useClickOutside<HTMLDivElement>(handleClickOutside);

  return (
    <div
      data-testid="dropdown-options"
      ref={ref}
      className="absolute right-0 top-12 w-42 bg-zinc-900 border-zinc-800 border flex flex-col justify-center rounded-md z-20 text-gray-100"
    >
      <button
        onClick={() => handleAction("rename")}
        className="block px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-800 cursor-pointer rounded-t-md"
      >
        Cambiar nombre
      </button>
      <button
        onClick={() => handleAction("delete")}
        className="block px-4 py-2 text-sm text-red-500 hover:bg-zinc-800 cursor-pointer rounded-b-md"
      >
        Eliminar
      </button>
    </div>
  );
};

export default SidebarChatOptions;
