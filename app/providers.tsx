import React from "react";
import GlobalProvider from "context/global";
import ModalProvider from "context/modal";
import SocketProvider from "context/socket";
import AuthProvider from "context/auth";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <ModalProvider>
          <SocketProvider>{children}</SocketProvider>
        </ModalProvider>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default Providers;
