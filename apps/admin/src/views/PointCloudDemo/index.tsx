import { Card, Col, ColorPicker, Row, Slider, Space, Statistic, Switch, Typography } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import { PointCloudViewer } from 'ui';

import { Page } from '@/components/Page';

const { Title, Text } = Typography;

const useStyles = createStyles(({ token }) => ({
  container: {
    height: 'calc(100vh - 140px)',
    minHeight: 600,
  },
  viewerContainer: {
    height: '100%',
    borderRadius: token.borderRadiusLG,
    overflow: 'hidden',
  },
  controlPanel: {
    height: '100%',
    padding: token.paddingLG,
  },
  statisticCard: {
    marginBottom: token.marginMD,
  },
}));

const PointCloudDemo: React.FC = () => {
  const { styles } = useStyles();
  const [pointCount, setPointCount] = React.useState(100000);
  const [color, setColor] = React.useState('#00ff00');
  const [pointSize, setPointSize] = React.useState(2);
  const [randomColor, setRandomColor] = React.useState(true);

  const handleColorChange = (value: any) => {
    setColor(value.toHexString());
  };

  return (
    <Page plugin={{ name: '点云渲染演示', desc: '使用 Three.js 渲染 10 万个点的 3D 点云场景', url: '' }}>
      <Row gutter={16} className={styles.container}>
        <Col span={18}>
          <Card className={styles.viewerContainer} bodyStyle={{ height: '100%', padding: 0 }}>
            <PointCloudViewer pointCount={pointCount} color={color} pointSize={pointSize} randomColor={randomColor} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className={styles.controlPanel} title='控制面板'>
            <Space direction='vertical' style={{ width: '100%' }} size='large'>
              <div>
                <Text strong>点数量</Text>
                <br />
                <Slider
                  min={1000}
                  max={200000}
                  step={1000}
                  value={pointCount}
                  onChange={setPointCount}
                  style={{ marginTop: 8 }}
                />
                <Statistic value={pointCount} suffix='个点' valueStyle={{ fontSize: 16 }} />
              </div>

              <div>
                <Text strong>随机颜色</Text>
                <br />
                <Switch checked={randomColor} onChange={setRandomColor} style={{ marginTop: 8 }} />
              </div>

              <div>
                <Text strong>点颜色</Text>
                <br />
                <ColorPicker
                  value={color}
                  onChange={handleColorChange}
                  showText
                  disabled={randomColor}
                  style={{ marginTop: 8 }}
                />
              </div>

              <div>
                <Text strong>点大小</Text>
                <br />
                <Slider
                  min={1}
                  max={10}
                  step={0.5}
                  value={pointSize}
                  onChange={setPointSize}
                  style={{ marginTop: 8 }}
                />
                <Statistic value={pointSize} suffix='px' valueStyle={{ fontSize: 16 }} />
              </div>

              <Card size='small' className={styles.statisticCard}>
                <Text type='secondary'>性能信息</Text>
                <div style={{ marginTop: 8 }}>
                  <Text>• 渲染引擎: Three.js</Text>
                  <br />
                  <Text>• FPS 监控: Stats.js</Text>
                </div>
              </Card>
            </Space>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default PointCloudDemo;
