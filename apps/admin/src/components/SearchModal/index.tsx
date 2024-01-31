/* eslint-disable consistent-return */
import { SearchOutlined } from '@ant-design/icons';
import { Badge, Input, List, Modal } from 'antd';
import { useTheme } from 'antd-style';
// eslint-disable-next-line import/no-extraneous-dependencies
import Fuse from 'fuse.js';
import { t } from 'i18next';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { treeToList } from '@/utils/helper/treeHelper';

import { getAsyncMenus } from '@/router/menus';

import useStyle from './style';

import type { AppMenu } from '@/router/types';

interface SearchModalProps {
  open?: boolean;
}

export interface SearchModalMethods {
  open: () => void;
  close: () => void;
}

const SearchModal = forwardRef<SearchModalMethods, SearchModalProps>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routes, setRoutes] = useState<AppMenu[]>([]);
  const { styles } = useStyle();
  const token = useTheme();

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
      boxShadow: '0 0 30px #99999994',
    },
  };
  const getMenusData = async () => {
    try {
      const routesData = await getAsyncMenus();
      setRoutes(routesData);
    } catch (error) {
      return [];
    }
  };
  useEffect(() => {
    getMenusData();
  }, []);
  const menus = useCallback(() => treeToList(routes, { children: 'children' }), [routes]);
  useImperativeHandle(ref, () => ({
    open: () => setIsModalOpen(() => true),
    close: () => setIsModalOpen(() => false),
  }));

  const fuse = new Fuse(menus(), {
    keys: ['name', 'path'],
    threshold: 0.2,
  });

  const [value, setValue] = useState('');

  // Function to highlight matching characters
  const highlightText = (text: string, searchValue: string) => {
    const regex = new RegExp(`(${searchValue})`, 'gi');
    return text.replace(
      regex,
      (match, p1) => `<span style="background-color: ${token.colorPrimaryBorderHover};">${p1}</span>`,
    );
  };

  return (
    <>
      <Modal
        title={
          <Input
            size='large'
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder={t('请输入搜索...')}
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
          dataSource={value ? fuse.search(value).map((item) => item.item) : menus()}
          renderItem={(item: AppMenu) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link
                    to={item.path}
                    onClick={() => setIsModalOpen(() => false)}
                    dangerouslySetInnerHTML={{ __html: highlightText(item.name, value) }}
                  />
                }
                description={<span dangerouslySetInnerHTML={{ __html: highlightText(item.path, value) }} />}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
});

export default SearchModal;
