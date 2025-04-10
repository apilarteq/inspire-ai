import React from "react";

interface Props {
  handleClickOutside: () => void;
}

const SidebarChatOptions = ({ handleClickOutside }: Props) => {
  return (
    <>
      <div
        className="fixed w-screen h-screen z-10 inset-0 cursor-default"
        onClick={handleClickOutside}
      />

      <div className="absolute right-0 top-12 w-48 bg-white rounded-md z-20 text-black py-1">
        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
          Ver detalles
        </a>
        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
          Editar
        </a>
        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">
          Compartir
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
        >
          Eliminar
        </a>
      </div>
    </>
  );
};

export default SidebarChatOptions;
