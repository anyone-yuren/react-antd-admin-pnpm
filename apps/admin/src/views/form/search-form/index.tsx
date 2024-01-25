import { Alert, Card, Col, Row, Slider } from 'antd';
import { GSearch, type GSearchField } from 'gbeata';
import { t } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PageWrapper } from '@/components/Page';

import { FORM_SEARCH_COMPO } from '@/settings/websiteSetting';

import type { FC } from 'react';

const SearchForm: FC = () => {
  const [width, setWidth] = useState(100);
  const fields: GSearchField[] = [
    {
      title: t('第一个'),
      key: '1',
      type: 'date',
    },
    {
      title: t('第二个'),
      key: '2',
    },
    {
      title: t('第三个'),
      key: '3',
    },
    {
      title: t('第四个'),
      key: '4',
    },
    {
      title: t('第五个'),
      key: '5',
    },
    {
      title: t('第六个'),
      key: '6',
    },
    {
      title: t('第七个'),
      key: '7',
    },
    {
      title: t('第八个'),
      key: '8',
    },
    {
      title: t('第九个'),
      key: '9',
    },
    {
      title: t('第十个'),
      key: '10',
    },
  ];

  return (
    <PageWrapper plugin={FORM_SEARCH_COMPO}>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Card title={t('基础用法')}>
            <Alert message={t('拖拽我，看看我的变化：')} type='info' showIcon />
            <Slider defaultValue={width} min={30} max={100} onChange={setWidth} />
            <div style={{ width: `${width}%` }}>
              <GSearch fields={fields} />
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title={t('超过一行就折叠')}>
            <Alert message={t('设置openRow，控制超过几行就折叠：')} type='info' showIcon />
            <Slider defaultValue={width} min={30} max={100} onChange={setWidth} />
            <div style={{ width: `${width}%` }}>
              <GSearch fields={fields} openRow={1} />
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title={t('默认展开全部')}>
            <Alert message={t('设置defaultOpen')} type='info' showIcon />
            <Slider defaultValue={width} min={30} max={100} onChange={setWidth} />
            <div style={{ width: `${width}%` }}>
              <GSearch fields={fields} defaultOpen />
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title={t('平铺展示')}>
            <Alert
              message={t('inline 状态下，所有的查询项的 title 不再有效，且会变成 placeholder，不断地平铺下去。')}
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
          <Card title={t('跨格')}>
            <Alert message={t('GSearch 的 span 值是无效的，请使用 grid 来指定占格')} type='info' showIcon />
            <Slider defaultValue={width} min={30} max={100} onChange={setWidth} />
            <div style={{ width: `${width}%` }}>
              <GSearch
                fields={fields.concat([
                  {
                    title: t('第一个'),
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
