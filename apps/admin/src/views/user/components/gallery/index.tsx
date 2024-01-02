import { Card, Checkbox, Col, Row, Select, Switch } from 'antd';

import type { FC } from 'react';

export interface PGallery {}
const Gallery: FC<PGallery> = () => (
  <>
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Card>
          <Checkbox>Checkbox</Checkbox>
          <Select
            defaultValue='lucy'
            style={{ width: 120 }}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
          <Switch defaultChecked />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Checkbox>Checkbox</Checkbox>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
          <p>sda</p>
        </Card>
      </Col>
    </Row>
  </>
);

export default Gallery;
