import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import { message as Message, Modal } from 'antd';

import { isString } from '@/utils/is';

import type { ModalFuncProps } from 'antd';

export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: 'success' | 'info' | 'warning' | 'error'
}

function getIcon(iconType: string) {
  if (iconType === 'warning') {
    return <InfoCircleFilled className='modal-icon-warning' />;
  } if (iconType === 'success') {
    return <CheckCircleFilled className='modal-icon-success' />;
  } if (iconType === 'info') {
    return <InfoCircleFilled className='modal-icon-info' />;
  }
  return <CloseCircleFilled className='modal-icon-error' />;
}

function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
  if (isString(content)) {
    // @ts-ignore
    return <div dangerouslySetInnerHTML={`<div>${content as string}</div>`}></div>;
  }
  return content;
}

// Create confirmation box
function createConfirm(options: ModalOptionsEx) {
  const iconType = options.iconType || 'warning';
  Reflect.deleteProperty(options, 'iconType');

  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    content: renderContent(options),
    okText: '确定',
    cancelText: '取消',
    ...options,
  };

  return Modal.confirm(opt);
}

export function useMessage() {
  return {
    createMessage: Message,
    createConfirm,
  };
}
