import { Dropdown, type MenuProps, Tabs, TabsProps } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import IconifyIcon from '@/components/iconify-icon';

import { MultiTabOperation, ThemeLayout } from '#/enum';

type Props = {
  offsetTop?: boolean;
};

export default function MultiTabs({ offsetTop = true }: Props) {
  const { TabPane } = Tabs;
  const { t } = useTranslation();

  const menuItens = useMemo<MenuProps['items']>(() => {
    return [
      {
        label: t('刷新'),
        key: MultiTabOperation.REFRESH,
        icon: <IconifyIcon icon='ant-design:reload-outlined' size={16} />,
      },
      {
        label: t('关闭右侧'),
        key: MultiTabOperation.CLOSERIGHT,
        icon: <IconifyIcon icon='ant-design:close-circle-outlined' size={16} />,
      },
      {
        label: t('关闭左侧'),
        key: MultiTabOperation.CLOSELEFT,
        icon: <IconifyIcon icon='ant-design:close-circle-outlined' size={16} />,
      },
      {
        label: t('关闭其他'),
        key: MultiTabOperation.CLOSEOTHERS,
        icon: <IconifyIcon icon='ant-design:close-circle-outlined' size={16} />,
      },
      {
        label: t('关闭全部'),
        key: MultiTabOperation.CLOSEALL,
        icon: <IconifyIcon icon='ant-design:close-circle-outlined' size={16} />,
      },
    ];
  }, []);
}
