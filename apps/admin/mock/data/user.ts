import { MockMethod } from 'vite-plugin-mock';
import { requestParams, resultSuccess, resultError, getRequestToken } from '../_utils';
import { USER_LIST } from '../_assets';
export function createFakeUserList() {
  return [
    {
      userId: '10000',
      username: 'admin',
      realName: 'react admin design',
      avatar: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/images/avatar.png',
      desc: 'super admin',
      password: '123456',
      token: 'gbeataToken',
      homePath: '/home',
    },
  ];
}

// Mock user login
export default [
  {
    url: '/api/login',
    timeout: 500,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      const user = USER_LIST.find((item) => item.username === username);
      // const checkUser = createFakeUserList().find((item) => item.username === username && password === item.password);
      if (!user) {
        return resultError('Incorrect account or password!');
      }
      return resultSuccess({
        ...user,
      });
    },
  },
  {
    url: '/api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token!');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      return resultSuccess(undefined, { message: 'Token has been destroyed!' });
    },
  },
] as MockMethod[];
