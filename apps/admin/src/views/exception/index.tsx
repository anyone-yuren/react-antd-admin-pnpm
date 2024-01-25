import { Button, Card, Result } from 'antd';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigate } from 'react-router-dom';

import SvgIcon from '@/components/SvgIcon';

import type { FC, ReactNode } from 'react';

const subTitleMap = new Map([
  [403, t('对不起，您没有权限访问此页面。')],
  [404, t('对不起，您访问的页面不存在。')],
  [500, t('对不起，服务器发生错误。')],
]);

const PageException: FC = () => {
  const navigate = useNavigate();

  const { status, withCard } = useLoaderData() as { status: any; withCard: boolean };

  const goHome = () => {
    navigate('/home');
  };

  const WithCard = ({ children }: { children: ReactNode }) => {
    if (withCard) {
      return <Card bordered={false}>{children}</Card>;
    }
    return (
      <div className='flex-center' style={{ height: '100vh' }}>
        {children}
      </div>
    );
  };

  return (
    <WithCard>
      <Result
        // status={status}
        title={status}
        icon={<SvgIcon size={380} name={status} />}
        subTitle={subTitleMap.get(status)}
        extra={
          <Button type='primary' onClick={goHome}>
            {t('返回首页')}
          </Button>
        }
      />
    </WithCard>
  );
};

export default PageException;
