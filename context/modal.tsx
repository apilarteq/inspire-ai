"use client";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "components/utils/modal";
import { ModalOptions } from "types/modal";

interface ModalProps {
  openModal: (component: React.ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
}

interface ModalState {
  open: boolean;
  component: React.ReactNode | null;
  options: ModalOptions;
}

interface Props {
  children: React.ReactNode;
}

const ModalContext = React.createContext({} as ModalProps);

export const useModal = () => React.useContext(ModalContext);

const ModalProvider = ({ children }: Props) => {
  const [isClient, setIsClient] = React.useState<boolean>(false);
  const [modalState, setModalState] = React.useState<ModalState>({
    open: false,
    component: null,
    options: {
      darkenBackground: true,
    },
  });

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const openModal = React.useCallback(
    (component: React.ReactNode, options?: ModalOptions) => {
      setModalState({
        open: true,
        component,
        options: {
          darkenBackground: options?.darkenBackground ?? true,
          maxSize: options?.maxSize ?? 512,
        },
      });
    },
    []
  );

  const closeModal = React.useCallback(() => {
    setModalState({
      open: false,
      component: null,
      options: {},
    });
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
          <Modal
            open={modalState.open}
            onClose={closeModal}
            options={modalState.options}
          >
            {modalState.component}
          </Modal>,
          document.getElementById("modal-root") ?? document.body
        )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
