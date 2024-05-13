import { USER_LIST } from '../_assets';
import { getRequestToken, type RequestParams, resultError, resultSuccess } from '../_utils';

import type { MockMethod } from 'vite-plugin-mock';

/**
 * Creates a fake user list with a single user object.
 *
 * @return {Array<Object>} An array containing a single user object with the following properties:
 *   - userId: string
 *   - username: string
 *   - realName: string
 *   - avatar: string
 *   - desc: string
 *   - password: string
 *   - token: string
 *   - homePath: string
 */
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
    response: (request: RequestParams) => {
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
    response: (request: RequestParams) => {
      return resultSuccess(undefined, { message: 'Token has been destroyed!' });
    },
  },
] as MockMethod[];
