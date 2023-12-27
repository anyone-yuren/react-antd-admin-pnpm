import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Checkbox, Form, Input, message, Typography } from 'antd';
import classNames from 'classnames';
import { type FC, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SvgIcon from '@/components/SvgIcon';

import { getAuthCache } from '@/utils/auth';

import { getUserInfo, loginApi } from '@/api';
import illustrationDashboard from '@/assets/images/illustration_dashboard.png';
import { TOKEN_KEY } from '@/enums/cacheEnum';
import { useAppDispatch, useAppSelector } from '@/stores';
import { setSessionTimeout, setToken, setUserInfo } from '@/stores/modules/user';

import useStyles from './index.style';

import type { LoginParams, UserInfo } from '@/types';
import type { FormInstance } from 'antd/es/form';

const { Title, Text } = Typography;

const LoginPage: FC = () => {
  const [form] = Form.useForm();
  const loginFormRef = useRef<FormInstance>(null);
  const [loading, setLoading] = useState(false);

  const { styles } = useStyles();

  const dispatch = useAppDispatch();

  const { token, sessionTimeout } = useAppSelector((state) => state.user);
  const getToken = (): string => token || getAuthCache<string>(TOKEN_KEY);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleLogin = async (values: any) => {
    debugger;
    try {
      setLoading(true);
      const userInfo = await loginAction({
        username: values.username,
        password: values.password,
      });
      if (userInfo) {
        message.success('登陆成功！');
      }
    } catch (error) {
      console.log(error);

      message.error((error as unknown as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const loginAction = async (
    params: LoginParams & {
      goHome?: boolean;
    },
  ): Promise<UserInfo | null> => {
    try {
      const { goHome = true, ...loginParams } = params;
      const data = await loginApi(loginParams);

      // 保存 Token
      dispatch(setToken(data?.token));
      return await afterLoginAction(goHome);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const afterLoginAction = async (goHome?: boolean): Promise<UserInfo | null> => {
    if (!getToken()) return null;

    const userInfo = await getUserInfoAction();

    if (sessionTimeout) {
      dispatch(setSessionTimeout(false));
    } else {
      const redirect = searchParams.get('redirect');
      if (redirect) {
        navigate(redirect);
      } else {
        goHome && navigate(userInfo?.homePath || '/home');
      }
    }

    return userInfo;
  };

  const getUserInfoAction = async (): Promise<UserInfo | null> => {
    if (!getToken()) return null;

    const userInfo = await getUserInfo();

    dispatch(setUserInfo(userInfo));

    return userInfo;
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-left']}>
        <Title className='logo' level={3}>
          <SvgIcon name='logo' size={30} />
        </Title>
        <Title level={2}>Hi, 欢迎回来！</Title>
        <img src={illustrationDashboard} alt='' className={styles['login-img']} />
      </div>
      <div className={styles['login-form']}>
        <div className='login-info'>
          <Title className='title' level={3}>
            登录 Gbeata Admin
          </Title>
          <Text type='secondary'>
            {' '}
            新用户？
            <Button
              type='link'
              style={{
                padding: 0,
              }}
              color='primary'
            >
              立即注册
            </Button>
          </Text>
          <Alert message='登录信息： 用户名：admin 密码：123456' type='info' showIcon />
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
          <Form.Item name='username' rules={[{ required: true, message: '请输入账号' }]}>
            <Input
              placeholder='请输入账号'
              size='large'
              prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} rev={undefined} />}
            />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input
              type='password'
              placeholder='请输入密码'
              size='large'
              prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} rev={undefined} />}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' className={classNames('fl', 'no-margin')} valuePropName='checked'>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item className={classNames('fr', 'no-margin')}>
              <a href=''>忘记密码？</a>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type='primary' block htmlType='submit' size='large' className='login-btn' loading={loading}>
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
