import React from "react";
import ChatGPT from "../components/ChatGPT";

const ChatTexte = () => {
  return (
    <div className="relative flex h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <ChatGPT />
    </div>
  );
};

export default ChatTexte;