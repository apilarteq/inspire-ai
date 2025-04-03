import React from "react";
import AuthTabs from "./tabs";
import LoginForm from "./forms/login";
import RegisterForm from "./forms/register";

interface Props {
  openTab: "login" | "register";
}

const Auth = ({ openTab }: Props) => {
  const [activeTab, setActiveTab] = React.useState<"login" | "register">(
    openTab
  );

  const handleActiveTab = (tab: "login" | "register") => setActiveTab(tab);

  return (
    <>
      <div className="mb-6">
        <AuthTabs activeTab={activeTab} handleActiveTab={handleActiveTab} />
      </div>
      <div className="transition-all duration-300 bg-[#2a2a2a]">
        {activeTab === "login" ? (
          <LoginForm handleActiveTab={handleActiveTab} />
        ) : (
          <RegisterForm handleActiveTab={handleActiveTab} />
        )}
      </div>
    </>
  );
};

export default Auth;
