/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// 晚点处理吧，类型导出有问题i
import dayjs from 'dayjs';
import { GSearchTable } from 'gbeata';
import { t } from 'i18next';
import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { GSearchTableField } from 'gbeata/lib/GSearchTable/g-search-table';

function CommitTable() {
  const [data, setData] = useState([]);

  const fields: Array<GSearchTableField> = [
    {
      title: t('作者'),
      key: 'author',
    },
    {
      title: t('提交信息'),
      key: 'message',
    },
    {
      title: t('时间'),
      key: 'time',
    },
  ];

  const apiUrl = 'https://api.github.com/repos/anyone-yuren/react-antd-admin-pnpm/commits?sha=admin&per_page=5';
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
          throw new Error(t('GitHub API请求失败：{{statusText}}', { statusText: response.statusText }));
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
      <GSearchTable title={t('Github 提交记录')} data={data} fields={fields} />
    </>
  );
}

export default memo(CommitTable);
