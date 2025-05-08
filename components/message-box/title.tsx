import React from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";

const MessageBoxTitle = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center transition-opacity duration-300">
      <div className="flex items-center gap-x-1">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Inspire AI
        </h2>
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
          <SparklesIcon className="h-12 w-12 text-purple-400 relative z-10" />
        </div>
      </div>
      <p className="text-zinc-400 max-w-md text-base">
        ¿En qué puedo ayudarte?
      </p>
    </div>
  );
};

export default MessageBoxTitle;
