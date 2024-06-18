import React from 'react';
import IconClose from '../../../public/IconClose';
import { useModal } from '../../context/modal.context';
import Backdrop from './Backdrop';
import Button from './Button';

const Modal = ({ content, type, onConfirm, onCancel }) => {
  const modal = useModal();

  const handleModalConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }

    modal.close();
  };

  const handleModalCancel = () => {
    modal.close();
  };

  const renderButton = () => {
    if (type === 'alert') {
      return (
        <div className="pt-10">
          <Button size="medium" color="primary" onClick={handleModalCancel}>
            확인
          </Button>
        </div>
      );
    } else if (type === 'confirm') {
      return (
        <div className="flex justify-between pt-10 w-full">
          <Button size="medium" color="danger" onClick={handleModalCancel}>
            취소
          </Button>
          <Button size="medium" color="primary" onClick={handleModalConfirm}>
            확인
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <Backdrop>
      <article className="bg-white p-10 max-w-sm w-full flex flex-col rounded-md justify-center items-center relative">
        <div
          className="position absolute top-4 right-4 cursor-pointer"
          onClick={handleModalCancel}
        >
          <IconClose />
        </div>

        <p>{content}</p>
        {renderButton()}
      </article>
    </Backdrop>
  );
};

export default Modal;
