import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ open, onClose, children }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // Solo se cierra si se hace clic exactamente en el backdrop
      onClose();
    }
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal={open}
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      <div
        className={`fixed inset-0 bg-primary/75 transition-opacity ${
          open
            ? "opacity-100 ease-out duration-300"
            : "opacity-0 ease-in duration-200"
        }`}
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          onClick={handleBackdropClick}
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            className={`relative transform overflow-hidden bg-[#18181b] text-left rounded-lg transition-all sm:my-8 sm:w-full sm:max-w-lg ${
              open
                ? "opacity-100 translate-y-0 sm:scale-100 ease-out duration-300"
                : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 ease-in duration-200"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
