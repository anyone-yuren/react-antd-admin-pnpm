import { SearchOutlined } from '@ant-design/icons';
import { Badge, Input, List, Modal } from 'antd';
import { useTheme } from 'antd-style';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

import useStyle from './style';

interface SearchModalProps {
  open?: boolean;
}

export interface SearchModalMethods {
  open: () => void;
  close: () => void;
}

const SearchModal = forwardRef<SearchModalMethods, SearchModalProps>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { styles } = useStyle();
  const token = useTheme();

  useImperativeHandle(ref, () => ({
    open: () => setIsModalOpen(() => true),
    close: () => setIsModalOpen(() => false),
  }));

  const classNames = {
    body: styles['my-modal-body'],
    mask: styles['my-modal-mask'],
    header: styles['my-modal-header'],
    footer: styles['my-modal-footer'],
    content: styles['my-modal-content'],
  };

  const modalStyles = {
    header: {
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    body: {
      borderRadius: 5,
      maxHeight: 300,
      overflow: 'auto',
      paddingInline: 10,
    },
    mask: {
      backdropFilter: 'blur(10px)',
    },
    footer: {
      borderTop: '1px solid #333',
    },
    content: {
      boxShadow: '0 0 30px #999',
    },
  };

  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
  ];

  return (
    <>
      <Modal
        title={
          <Input
            size='large'
            placeholder='请输入搜索...'
            prefix={<SearchOutlined />}
            suffix={<Badge count={'Esc'} color={token.colorPrimaryHover} />}
          />
        }
        closeIcon={null}
        open={isModalOpen}
        onOk={() => setIsModalOpen(() => false)}
        onCancel={() => setIsModalOpen(() => false)}
        footer={null}
        classNames={classNames}
        styles={modalStyles}
      >
        <List
          itemLayout='horizontal'
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={<a href='https://ant.design'>{item.title}</a>}
                description='Ant Design, a design language for background applications, '
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
});

export default SearchModal;
