import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const dropIn = {
    hidden: { y: '-100%', opacity: 0 },
    visible: { y: '0%', opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { y: '-100%', opacity: 0, transition: { duration: 0, ease: 'easeIn' } },
};

const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity bg-blur">
        <motion.div
          className="rounded-lg px-4 py-4 w-full bg-secondary max-w-md relative"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="text-lg text-gray-50 text-center">{title}</div>
            <div className="p-3 bg-block rounded-md cursor-pointer" onClick={onClose}>
              <div className="icon w-3 bg-white" style={{ maskImage: 'url("/close.svg")' }}></div>
            </div>
          </div>
          {children}
        </motion.div>
      </div>
    );
};

export default Modal;
