import { Badge, Button, Col, Row } from 'antd';
import React, { useMemo } from 'react';

import { APP_THEME_COLOR_LIST } from '@/settings/designSetting';
import { useGlobalStore } from '@/stores/admin';

const Presets = () => {
  const { preset, setPreset } = useGlobalStore();
  // const { preset, setPreset } = useGlobalStore((state) => state);

  const PresetsTheme = useMemo(
    () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      APP_THEME_COLOR_LIST.map((item) => (
        <Col span={8} key={item.color}>
          <Button block size='large' onClick={() => setPreset(item.color)}>
            <Badge
              styles={{
                root: {},
                indicator:
                  preset === item.color
                    ? {
                        width: '16px',
                        height: '16px',
                      }
                    : {
                        width: '12px',

                        height: '12px',
                      },
              }}
              status={preset === item.color ? 'processing' : 'default'}
              color={item.color}
            ></Badge>
          </Button>
        </Col>
      )),
    [APP_THEME_COLOR_LIST, preset],
  );
  return <Row gutter={[16, 16]}>{PresetsTheme}</Row>;
};

export default Presets;
