import { createContext, useContext, useState } from 'react';
import Modal from '../common/components/Modal';

const initialValue = {
  open: () => {},
  close: () => {},
};

const ModalContext = createContext(initialValue);

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [modalOptions, setModalOptions] = useState(null);

  const value = {
    open: (option) => {
      setModalOptions(option);
    },
    close: () => {
      if (modalOptions?.onClose) {
        modalOptions.onClose();
      }
      setModalOptions(null);
    },
    isOpen: !!modalOptions,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalOptions && (
        <Modal
          type={modalOptions.type}
          content={modalOptions.content}
          onConfirm={modalOptions.onConfirm}
          onCancel={modalOptions.onCancel}
        />
      )}
    </ModalContext.Provider>
  );
}
