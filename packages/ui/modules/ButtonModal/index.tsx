import { Button, ButtonProps as AntdButtonProps, Modal, ModalProps as AntdModalProps } from 'antd';
import React, { FC, useState } from 'react';

interface ButtonProps extends AntdButtonProps {
  text: string | JSX.Element;
}

export interface ButtonModalProps {
  buttonProps: ButtonProps;
  modalProps?: AntdModalProps;
  children: React.ReactNode;
}

const ButtonModal: FC<ButtonModalProps> = ({ buttonProps, modalProps, children }) => {
  const { onClick, text, ...buttonRest } = buttonProps ?? {};

  const { onOk, onCancel, open: openProps,...modalRest } = modalProps ?? {};

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={(e) => {
          onClick?.(e);
          setOpen(true);
        }}
        {...buttonRest}
      >
        {text}
      </Button>
      <Modal
        open={openProps || open}
        onOk={(e) => {
          onOk?.(e);
          setOpen(false);
        }}
        onCancel={(e) => {
          onCancel?.(e);
          setOpen(false);
        }}
        {...modalRest}
      >
        {children}
      </Modal>
    </>
  );
};

export default ButtonModal;
