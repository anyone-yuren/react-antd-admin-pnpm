import { message as Message, Modal } from 'antd';

import type { ModalFuncProps } from 'antd';

export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: 'success' | 'info' | 'warning' | 'error';
}

export function useMessage() {
  const [modal, contextHolder] = Modal.useModal();
  return {
    createMessage: Message,
    createConfirm: modal.confirm,
    contextHolder,
  };
}
