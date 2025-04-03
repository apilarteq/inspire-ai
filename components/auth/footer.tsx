import React from "react";

interface Props {
  title: string;
  handleActiveTab: () => void;
  buttonLabel: string;
}

const AuthFooter = ({ title, handleActiveTab, buttonLabel }: Props) => {
  return (
    <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>
        {title}{" "}
        <button
          onClick={handleActiveTab}
          className="text-secondary cursor-pointer hover:text-secondary-hover font-medium"
        >
          {buttonLabel}
        </button>
      </p>
    </div>
  );
};

export default AuthFooter;
