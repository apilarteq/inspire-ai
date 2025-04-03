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
    <AuthProvider>
      <ModalProvider>
        <GlobalProvider>
          <SocketProvider>{children}</SocketProvider>
        </GlobalProvider>
      </ModalProvider>
    </AuthProvider>
  );
};

export default Providers;
