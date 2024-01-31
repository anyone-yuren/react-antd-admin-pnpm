import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Checkbox, Form, Input, message, Typography } from 'antd';
import classNames from 'classnames';
import { t } from 'i18next';
import { type FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SvgIcon from '@/components/SvgIcon';

import illustrationDashboard from '@/assets/images/illustration_dashboard.png';
import { useSignIn } from '@/stores/modules/userStore';

import useStyles from './index.style';

import type { FormInstance } from 'antd/es/form';

const { Title, Text } = Typography;

const LoginPage: FC = () => {
  const [form] = Form.useForm();
  const loginFormRef = useRef<FormInstance>(null);
  const [loading, setLoading] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { styles } = useStyles();

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const res = await signIn({
        username: values.username,
        password: values.password,
      });

      if (res) {
        navigate(searchParams.get('redirect') || '/');
      }
    } catch (error) {
      message.error((error as unknown as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-left']}>
        <Title className='logo' level={3}>
          <SvgIcon name='logo' size={30} />
        </Title>
        <Title level={2}>{t('Hi, 欢迎回来！')}</Title>
        <img src={illustrationDashboard} alt='' className={styles['login-img']} />
      </div>
      <div className={styles['login-form']}>
        <div className='login-info'>
          <Title className='title' level={3}>
            {t('登录 Gbeata Admin')}
          </Title>
          <Text type='secondary'>
            {' '}
            {t('新用户？')}
            <Button
              type='link'
              style={{
                padding: 0,
              }}
              color='primary'
            >
              {t('立即注册')}
            </Button>
          </Text>
          <Alert message={t('登录信息： 用户名：admin 密码：123456')} type='info' showIcon />
        </div>
        <Form
          ref={loginFormRef}
          form={form}
          initialValues={{
            username: 'admin',
            password: '123456',
            remember: true,
          }}
          className='login-box-form'
          onFinish={handleLogin}
        >
          <Form.Item name='username' rules={[{ required: true, message: t('请输入账号') }]}>
            <Input
              placeholder={t('请输入账号')}
              size='large'
              prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} rev={undefined} />}
            />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: t('请输入密码') }]}>
            <Input
              type='password'
              placeholder={t('请输入密码')}
              size='large'
              prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} rev={undefined} />}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' className={classNames('fl', 'no-margin')} valuePropName='checked'>
              <Checkbox>{t('记住我')}</Checkbox>
            </Form.Item>
            <Form.Item className={classNames('fr', 'no-margin')}>
              <a href=''>{t('忘记密码？')}</a>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type='primary' block htmlType='submit' size='large' className='login-btn' loading={loading}>
              {t('登 录')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
