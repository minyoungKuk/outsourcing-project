import React from 'react';
import { useModal } from '../../context/modal.context';

const Backdrop = ({ children }) => {
  const modal = useModal();

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      modal.close();
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black/60 flex items-center justify-center z-9999"
      onClick={handleCloseModal}
    >
      {children}
    </div>
  );
};

export default Backdrop;
