/*
 * @Description: 可拖拽的Modal
 * @Author: kelly
 * @Date: 2021/4/26 16:44:23
 */
import { Button, Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import classNames from 'classnames';
import React, { FC, useEffect } from 'react';
import './styles.less';
export interface BasicModalProps extends ModalProps {
  /** 是否可拖拽 */
  draggable?: boolean;
}

const BasicModal: FC<BasicModalProps> = ({
  children,
  draggable = true,
  width,
  ...other
}) => {
  useEffect(() => {
    let contentBox: HTMLDivElement;
    let handleBox: HTMLDivElement;
    let onMousedown: (e: MouseEvent) => void;
    let moveTo: (e: MouseEvent) => void;

    if (draggable) {
      contentBox = window.document.querySelector(
        '.basic-modal .ant-modal-content',
      );

      handleBox = window.document.querySelector(
        '.basic-modal .ant-modal-header',
      );

      const maxWidth = document.body.offsetWidth;
      const maxHeight = document.body.offsetHeight;

      onMousedown = (e) => {
        const {
          left: leftX,
          top: topY,
          width,
          height,
        } = contentBox.getBoundingClientRect();
        const left = e.clientX - leftX;
        const top = e.clientY - topY;

        moveTo = (e: MouseEvent) => {
          const x = e.clientX - left;
          const y = e.clientY - top;
          contentBox.style.transform = 'none';

          if (x >= 0 && x + width <= maxWidth) {
            contentBox.style.left = `${x}px`;
          }
          if (y >= 0 && y <= maxHeight - height) {
            contentBox.style.top = `${y}px`;
          }
        };

        //监听鼠标放开事件
        document.addEventListener('mouseup', function (e) {
          document.removeEventListener('mousemove', moveTo);
        });

        //监听鼠标移动事件
        document.addEventListener('mousemove', moveTo);
      };

      //监听鼠标按下事件
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      handleBox && handleBox.addEventListener('mousedown', onMousedown);
    }

    return () => {
      if (moveTo) {
        document.removeEventListener('mousemove', moveTo);
      }
      if (onMousedown && handleBox) {
        handleBox.removeEventListener('mousedown', onMousedown);
      }
    };
  }, [draggable]);

  useEffect(() => {
    if (width) {
      const contentBox: HTMLDivElement = window.document.querySelector(
        '.basic-modal .ant-modal-content',
      );
      if (typeof width === 'number' && contentBox) {
        contentBox.style.width = `${width}px`;
      }
      if (typeof width === 'string' && contentBox) {
        contentBox.style.width = width;
      }
    }
  }, [width]);

  return (
    <Modal
      {...other}
      wrapClassName={classNames('basic-modal', other?.wrapClassName || '', {
        draggable,
      })}
      forceRender
      footer={
        other?.footer === null
          ? null
          : other?.footer || (
              <>
                <Button
                  loading={other?.confirmLoading}
                  type="primary"
                  onClick={(e) => {
                    typeof other?.onOk === 'function' && other.onOk(e);
                  }}
                >
                  确定
                </Button>
                <Button
                  onClick={(e) => {
                    typeof other?.onCancel === 'function' && other.onCancel(e);
                  }}
                >
                  取消
                </Button>
              </>
            )
      }
    >
      {children}
    </Modal>
  );
};

export default BasicModal;
