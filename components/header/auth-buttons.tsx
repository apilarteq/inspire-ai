import React from "react";
import Auth from "../auth";
import { useModal } from "context/modal";

const HeaderAuthButtons = () => {
  const { openModal } = useModal();

  const handleModal = (openTab: "login" | "register") =>
    openModal(<Auth openTab={openTab} />);

  return (
    <div className="flex items-center gap-x-4 text-black">
      <button
        className="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-300 active:bg-gray-200 transition-all cursor-pointer"
        onClick={() => handleModal("login")}
      >
        Sign in
      </button>
      <button
        className="bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-300 active:bg-gray-200 transition-all cursor-pointer"
        onClick={() => handleModal("register")}
      >
        Sign up
      </button>
    </div>
  );
};

export default HeaderAuthButtons;
