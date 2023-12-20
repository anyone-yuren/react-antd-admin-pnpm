/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// 晚点处理吧，类型导出有问题i
import dayjs from 'dayjs';
import { type GSearchTableField, GSearchTable } from 'gbeata/src/index';
import { memo, useEffect, useMemo, useState } from 'react';

function CommitTable() {
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

  useEffect(() => {
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GitHub API请求失败：${response.statusText}`);
        }
        return response.json();
      })
      .then((source) => {
        setData(
          source.map(
            (item: {
              commit: {
                author: { name: any; date: string | number | Date | dayjs.Dayjs | null | undefined };
                message: any;
              };
            }) => ({
              author: item.commit.author.name,
              message: item.commit.message,
              time: dayjs(item.commit.author.date).format('YYYY-MM-DD HH:mm:ss'),
            }),
          ),
        );
      })
      .catch((error) => {
        console.error('发生错误：', error.message);
      });
  }, []); // 空数组表示仅在组件挂载时执行一次

  return (
    <>
      <GSearchTable title='Github 提交记录' data={data} fields={fields} />
    </>
  );
}

export default memo(CommitTable);
