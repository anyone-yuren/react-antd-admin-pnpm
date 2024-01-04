import { Card } from 'antd';
import { GSearchTable } from 'gbeata';
import React, { useState } from 'react';

import { juejinData } from './data';

import type { GSearchTableField } from 'gbeata/lib/GSearchTable/g-search-table';

const fields: Array<GSearchTableField> = [
  {
    title: '文章标题',
    key: 'title',
    search: true,
    render: (text, record) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { title, article_id } = record.article_info;
      return (
        <a href={`https://juejin.cn/post/${article_id}`} target='_blank' rel='noreferrer'>
          {title}
        </a>
      );
    },
  },
  {
    title: '简介',
    key: 'brief_content',
    render: (text, record) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { brief_content } = record.article_info;
      return brief_content;
    },
  },

  {
    title: '阅读数',
    width: '120px',
    key: 'view_count',
    render: (text, record) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { view_count } = record.article_info;
      return view_count;
    },
  },
  {
    title: '点赞数',
    key: 'digg_count',
    width: '120px',
    sort: true,
    render: (text, record) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { digg_count } = record.article_info;
      return digg_count;
    },
  },
  {
    title: '收藏数',
    key: 'collect_count',
    width: '90px',
    render: (text, record) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { collect_count } = record.article_info;
      return collect_count;
    },
  },
];

export default function JuejinTable() {
  const [data] = useState(juejinData);
  return (
    <Card>
      <GSearchTable data={data} title='我的掘金文章' fields={fields} rowKey='sort_id' />
    </Card>
  );
}
