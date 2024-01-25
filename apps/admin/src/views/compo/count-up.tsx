import { Button, Card, Col, Form, Input, InputNumber, Row, Space } from 'antd';
import { t } from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import CountUp, { useCountUp } from 'react-countup';
import { useTranslation } from 'react-i18next';

import { PageWrapper } from '@/components/Page';

import { COUNTUP_PLUGIN } from '@/settings/websiteSetting';

const CountUpPage: React.FC = () => {
  const [form] = Form.useForm();
  const [formData, setFromData] = useState({
    start: 0,
    end: 2020,
    duration: 4,
    decimals: 0,
    separator: ',',
    prefix: '￥ ',
    suffix: ' rmb',
  });

  const countUpRef = useRef(null);
  const { start, reset } = useCountUp({
    ref: countUpRef,
    ...formData,
  });

  useEffect(() => {
    reset();
  }, []);

  const onValuesChange = (values: any) => {
    setFromData({ ...formData, ...values });
  };

  return (
    <PageWrapper plugin={COUNTUP_PLUGIN}>
      <Row gutter={12}>
        <Col span={6}>
          <Card title={t('正向增加')} bordered={false} bodyStyle={{ height: '300px' }}>
            <CountUp
              start={0}
              end={2020}
              duration={4}
              style={{
                height: '100%',
                fontSize: '40px',
                color: '#e65d6e',
              }}
              className='flex-center'
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={t('自定义配置')} bordered={false} bodyStyle={{ height: '300px' }}>
            <div className='flex-center' style={{ marginBottom: '30px' }}>
              <span
                ref={countUpRef}
                style={{
                  fontSize: '40px',
                  color: '#e65d6e',
                }}
              />
            </div>
            <Form
              form={form}
              initialValues={{ ...formData }}
              layout='inline'
              labelAlign='left'
              labelCol={{ style: { width: '80px', marginBottom: '12px' } }}
              onValuesChange={onValuesChange}
            >
              <Form.Item label='startVal:' name='start'>
                <InputNumber min={0} max={10000} style={{ width: '100px' }} />
              </Form.Item>
              <Form.Item label='endVal:' name='end'>
                <InputNumber min={0} max={10000} style={{ width: '100px' }} />
              </Form.Item>
              <Form.Item label='duration:' name='duration'>
                <InputNumber min={1} max={100} style={{ width: '100px' }} />
              </Form.Item>
              <Form.Item label='decimals:' name='decimals'>
                <InputNumber min={0} max={100} style={{ width: '100px' }} />
              </Form.Item>
              <Form.Item label='separator:' name='separator'>
                <Input style={{ width: '100px' }} />
              </Form.Item>
              <Form.Item label='prefix:' name='prefix'>
                <Input style={{ width: '100px' }} />
              </Form.Item>
              <Form.Item label='suffix:' name='suffix'>
                <Input style={{ width: '100px' }} />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type='primary' onClick={start}>
                    {t('开始')}
                  </Button>
                  <Button type='primary' danger onClick={reset}>
                    {t('重置')}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={6}>
          <Card title={t('反向减少')} bordered={false} bodyStyle={{ height: '300px' }}>
            <CountUp
              start={2020}
              end={0}
              duration={4}
              style={{
                height: '100%',
                fontSize: '40px',
                color: '#30b08f',
              }}
              className='flex-center'
            />
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  );
};

export default CountUpPage;
