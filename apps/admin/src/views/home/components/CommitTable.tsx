/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// 晚点处理吧，类型导出有问题i
import { type GSearchTableField, GSearchTable } from 'gbeata';
import { memo, useMemo, useState } from 'react';

function Demo() {
  const [data, setData] = useState([]);

  const fields: Array<GSearchTableField> = [
    {
      title: '作者',
      key: 'author',
    },
    {
      title: '提交信息',
      key: 'message',
    },
    {
      title: '时间',
      key: 'time',
    },
  ];
  const apiUrl = 'https://api.github.com/repos/anyone-yuren/react-antd-admin-pnpm/commits?sha=admin&per_page=10';
  const accessToken = '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';

  fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })
    .then((response) => {
      // 如果响应状态码不是 200 OK，则可能有错误
      if (!response.ok) {
        throw new Error(`GitHub API请求失败：${response.statusText}`);
      }

      // 将响应的JSON数据解析为 JavaScript 对象
      return response.json();
    })
    .then((data) => {
      setData(
        data.map((item) => ({
          author: item.commit.author.name,
          message: item.commit.message,
          time: item.commit.author.date,
        })),
      );

      // 在这里对数据进行进一步处理
    })
    .catch((error) => {
      // 捕获和处理错误
      console.error('发生错误：', error.message);
    });
  const renderTable = useMemo(() => () => <GSearchTable title='Github 提交记录' data={data} fields={fields} />, [data]);

  return <>{renderTable()}</>;
}

export default memo(Demo);
