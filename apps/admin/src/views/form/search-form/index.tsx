import { Alert, Card, Col, Row, Slider } from 'antd';
import { GSearch, type GSearchField } from 'gbeata';
import { useState } from 'react';

import { PageWrapper } from '@/components/Page';

import { FORM_SEARCH_COMPO } from '@/settings/websiteSetting';

import type { FC } from 'react';

const SearchForm: FC = () => {
  const [width, setWidth] = useState(100);
  const fields: GSearchField[] = [
    {
      title: '第一个',
      key: '1',
      type: 'date',
    },
    {
      title: '第二个',
      key: '2',
    },
    {
      title: '第三个',
      key: '3',
    },
    {
      title: '第四个',
      key: '4',
    },
    {
      title: '第五个',
      key: '5',
    },
    {
      title: '第六个',
      key: '6',
    },
    {
      title: '第七个',
      key: '7',
    },
    {
      title: '第八个',
      key: '8',
    },
    {
      title: '第九个',
      key: '9',
    },
    {
      title: '第十个',
      key: '10',
    },
  ];
  return (
    <PageWrapper plugin={FORM_SEARCH_COMPO}>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Card title='基础用法'>
            <Alert message='拖拽我，看看我的变化：' type='info' showIcon />
            <Slider defaultValue={width} min={30} max={100} onChange={setWidth} />
            <div style={{ width: `${width}%` }}>
              <GSearch fields={fields} />
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title='超过一行就折叠'>
            <Alert message='设置openRow，控制超过几行就折叠：' type='info' showIcon />
            <Slider defaultValue={width} min={30} max={100} onChange={setWidth} />
            <div style={{ width: `${width}%` }}>
              <GSearch fields={fields} openRow={1} />
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title='默认展开全部'>
            <Alert message='设置defaultOpen' type='info' showIcon />
            <Slider defaultValue={width} min={30} max={100} onChange={setWidth} />
            <div style={{ width: `${width}%` }}>
              <GSearch fields={fields} defaultOpen />
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title='平铺展示'>
            <Alert
              message='inline 状态下，所有的查询项的 title 不再有效，且会变成 placeholder，不断地平铺下去。'
              type='info'
              showIcon
            />
            <Slider defaultValue={width} min={30} max={100} onChange={setWidth} />
            <div style={{ width: `${width}%` }}>
              <GSearch fields={fields} defaultOpen inline toggleVisible={false} />
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title='跨格'>
            <Alert message='GSearch 的 span 值是无效的，请使用 grid 来指定占格' type='info' showIcon />
            <Slider defaultValue={width} min={30} max={100} onChange={setWidth} />
            <div style={{ width: `${width}%` }}>
              <GSearch
                fields={fields.concat([
                  {
                    title: '第一个',
                    key: '1',
                    grid: {
                      large: 12,
                      middle: 16,
                      small: 24,
                      mini: 24,
                    },
                  },
                ])}
                defaultOpen
              />
            </div>
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  );
};
export default SearchForm;
