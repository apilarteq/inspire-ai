"use client";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "components/utils/modal";

interface ModalProps {
  openModal: (component: React.ReactNode) => void;
  closeModal: () => void;
}

interface Props {
  children: React.ReactNode;
}

const ModalContext = React.createContext({} as ModalProps);

export const useModal = () => React.useContext(ModalContext);

const ModalProvider = ({ children }: Props) => {
  const [isClient, setIsClient] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [component, setComponent] = React.useState<React.ReactNode | null>(
    null
  );

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const openModal = React.useCallback((component: React.ReactNode) => {
    setComponent(component);
    setOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setComponent(null);
    setOpen(false);
  }, []);

  const modalProviderValue = React.useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal]
  );

  return (
    <ModalContext.Provider value={modalProviderValue}>
      {children}
      {isClient &&
        ReactDOM.createPortal(
          <Modal open={open} onClose={closeModal}>
            {component}
          </Modal>,
          document.getElementById("modal-root") ?? document.body
        )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
