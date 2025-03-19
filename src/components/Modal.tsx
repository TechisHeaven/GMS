import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fadeIn"
        >
          <div className="flex items-center justify-between p-4 border-b border-b-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={(event) => {
          if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
          ) {
            onClose();
          }
        }}
      />
    </>
  );
};

export default Modal;
