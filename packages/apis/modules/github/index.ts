import { GRequest } from '../../request';

import type { IResponse } from '../../type';

const accessToken = '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';
const repoOwner = 'anyone-yuren';
const repoName = 'react-antd-admin-pnpm';
const apiUrl = `/${repoOwner}/${repoName}/commits?per_page=10`;
export const GetGithubCommits = () =>
  GRequest<IResponse<any>>(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
