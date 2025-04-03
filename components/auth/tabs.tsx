import React from "react";

interface Props {
  activeTab: "login" | "register";
  handleActiveTab: (tab: "login" | "register") => void;
}

const AuthTabs = ({ activeTab, handleActiveTab }: Props) => {
  return (
    <div className="bg-header w-full flex h-10 rounded-md p-1">
      <button
        onClick={() => handleActiveTab("login")}
        className={`w-1/2 rounded-md cursor-pointer transition-all duration-150 ${
          activeTab === "login" ? "bg-primary text-white" : "text-gray-400"
        }`}
      >
        Iniciar sesion
      </button>
      <button
        onClick={() => handleActiveTab("register")}
        className={`w-1/2 rounded-md cursor-pointer transition-all duration-150 ${
          activeTab === "register" ? "bg-primary" : "text-gray-400"
        }`}
      >
        Registrarse
      </button>
    </div>
  );
};

export default AuthTabs;
