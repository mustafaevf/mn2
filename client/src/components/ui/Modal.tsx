import React, { ReactNode } from 'react';

interface ModalProps {
  title: string,
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 shadow-lg flex items-center justify-center z-50 bg-opacity">
      <div className="rounded-lg p-6 w-full bg-modal max-w-md relative">
        <div className="flex justify-between items-center mb-3">
          <div className="title text-lg text-gray-50">
            {title}
          </div>
          <div className="p-3 bg-block rounded-md cursor-pointer" onClick={onClose}>
            <div className="icon w-3 bg-white" style={{ maskImage: 'url("/close.svg")' }}></div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;