import React from "react";
import { ModalOptions } from "types/modal";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  options: ModalOptions;
}

const Modal: React.FC<Props> = ({ open, onClose, children, ...props }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
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
        className={`fixed inset-0 ${
          props.options.darkenBackground ? "bg-primary/75" : ""
        } transition-opacity ${
          open
            ? "opacity-100 ease-out duration-300"
            : "opacity-0 ease-in duration-200"
        }`}
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          onClick={handleBackdropClick}
          className="flex min-h-full items-center justify-center text-center p-0"
        >
          <div
            data-testid="modal-children-wrapper"
            style={{
              maxWidth:
                typeof props.options.maxSize === "number"
                  ? `${props.options.maxSize}px`
                  : props.options.maxSize,
            }}
            className={`relative transform overflow-hidden bg-[#18181b] text-left rounded-lg transition-all sm:my-8 w-full sm:mx-0 mx-8 ${
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
