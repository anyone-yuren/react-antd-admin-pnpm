import { Card, Checkbox, Col, Row, Select, Switch } from 'antd';

import type { FC } from 'react';

export interface PFollowers {}
const Followers: FC<PFollowers> = () => (
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
      <Col span={12}></Col>
    </Row>
  </>
);

export default Followers;
