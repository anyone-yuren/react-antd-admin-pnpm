import { Drawer, Modal, ModalProps, Space } from 'antd';
import React from 'react';
import GButton from '../GButton';
import locale from '../locale';
import { AnyKeyProps } from '../types/AnyKeyProps';
import { omitObj } from '../utils';
import { GDialogProps } from './g-dialog';

const usedKeys = [
  'loading',
  'confirmVisible',
  'cancelVisible',
  'confirmText',
  'cancelText',
  'confirmProps',
  'cancelProps',
  'confirmBefore',
  'confirmAfter',
  'cancelBefore',
  'cancelAfter',
];

export function AyDialogFooter(
  props: GDialogProps,
  handleCancel: () => void,
  handleConfirm: () => void,
) {
  const {
    loading,
    confirmVisible,
    cancelVisible,
    confirmText,
    cancelText,
    confirmProps,
    cancelProps,
    confirmBefore,
    confirmAfter,
    cancelBefore,
    cancelAfter,
  } = props;

  return (
    <Space>
      {cancelBefore}
      {cancelVisible !== false && (
        <GButton {...cancelProps} onClick={handleCancel}>
          {cancelText || locale.dialog.close}
        </GButton>
      )}
      {cancelAfter}
      {confirmBefore}
      {confirmVisible !== false && (
        <GButton
          type="primary"
          {...confirmProps}
          onClick={handleConfirm}
          loading={loading}
        >
          {confirmText || locale.dialog.confirm}
        </GButton>
      )}
      {confirmAfter}
    </Space>
  );
}
export let defaultProps: ModalProps = {};

export const setGlobalDialogField = (cb: () => ModalProps) => {
  defaultProps = { ...cb(), ...defaultProps };
};

export default function MwDialog(props: GDialogProps) {
  const {
    title,
    titleBefore,
    titleAfter,
    children,
    visible,
    setVisible,
    onConfirm,
    onOk,
    onClose,
    onCancel,
    footer,
    width,
    drawer,
    ...extraProps
  } = props;
  const extraPropsExtend = { ...defaultProps, ...extraProps };

  const handleCancel = () => {
    setVisible && setVisible(false);
    onClose && onClose();
    onCancel && onCancel();
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (onOk) {
      onOk();
    }
  };

  // 弹窗底部按钮
  const getDialogFooter = function () {
    if (footer === false || footer === null) {
      return null;
    } else if (footer === undefined) {
      return AyDialogFooter(props, handleCancel, handleConfirm);
    }
    return footer;
  };

  const dialogProps: AnyKeyProps = drawer
    ? {
        width: width || 500,
        title: (
          <Space>
            {titleBefore}
            {title}
            {titleAfter}
          </Space>
        ),
        visible,
        closable: true,
        onClose: handleCancel,
        footer: getDialogFooter(),
        ...omitObj(extraPropsExtend, usedKeys),
      }
    : {
        width: width || 500,
        title: (
          <Space>
            {titleBefore}
            {title}
            {titleAfter}
          </Space>
        ),
        visible,
        onCancel: handleCancel,
        footer: getDialogFooter(),
        ...omitObj(extraPropsExtend, usedKeys),
      };

  return drawer ? (
    <Drawer footerStyle={{ textAlign: 'right' }} {...dialogProps}>
      {children}
    </Drawer>
  ) : (
    <Modal {...dialogProps}>{children}</Modal>
  );
}
