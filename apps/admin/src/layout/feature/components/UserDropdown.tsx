import { LockOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useMessage } from '@/hooks/web/useMessage';

import { clearAuthCache, getAuthCache } from '@/utils/auth';

import { logoutApi } from '@/api';
import headerImg from '@/assets/images/avatar.jpeg';
import { TOKEN_KEY } from '@/enums/cacheEnum';
import { useAppDispatch, useAppSelector } from '@/stores';
import { resetState } from '@/stores/modules/user';

import type { MenuProps } from 'antd';

export default function UserDropdown() {
  const { createConfirm, contextHolder } = useMessage();
  const items: MenuProps['items'] = [
    {
      key: 'lock',
      label: (
        <Space size={4}>
          <LockOutlined rev={undefined} />
          <span>{t('锁定屏幕')}</span>
        </Space>
      ),
    },
    {
      key: 'logout',
      label: (
        <Space size={4}>
          <PoweroffOutlined rev={undefined} />
          <span>{t('退出登录')}</span>
        </Space>
      ),
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'lock':
        handleLock();
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const getToken = (): string => token || getAuthCache<string>(TOKEN_KEY);

  const handleLock = () => {};

  const handleLogout = () => {
    createConfirm({
      title: <span>{t('温馨提醒')}</span>,
      content: <span>{t('是否确认退出系统?')}</span>,
      onOk: async () => {
        await logoutAction(true);
      },
    });
  };

  const logoutAction = async (goLogin = false) => {
    if (getToken()) {
      try {
        await logoutApi();
      } catch (error) {
        const { createMessage } = useMessage();
        createMessage.error(t('注销失败!'));
      }
    }
    dispatch(resetState());
    clearAuthCache();
    goLogin && navigate('/login');
  };

  return (
    <>
      {contextHolder}
      <Dropdown menu={{ items, onClick }} placement='bottomRight' arrow>
        <span className='flex-center' style={{ cursor: 'pointer' }}>
          <img
            src={headerImg}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
            }}
            alt=''
          />
        </span>
      </Dropdown>
    </>
  );
}
