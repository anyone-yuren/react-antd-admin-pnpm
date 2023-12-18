import { Badge, Button, Col, Row } from 'antd';
import React, { useMemo } from 'react';

import { APP_THEME_COLOR_LIST } from '@/settings/designSetting';

const Presets = () => {
  const PresetsTheme = useMemo(
    () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      APP_THEME_COLOR_LIST.map((item) => (
        <Col span={8}>
          <Button block size='large'>
            <Badge
              styles={{
                root: {},
                indicator: {
                  width: '12px',
                  height: '12px',
                },
              }}
              color={item.color}
            ></Badge>
          </Button>
        </Col>
      )),
    [APP_THEME_COLOR_LIST],
  );
  return <Row gutter={[16, 16]}>{PresetsTheme}</Row>;
};

export default Presets;
