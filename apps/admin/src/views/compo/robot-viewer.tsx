import { Card, Col, Row, Typography } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import { RobotViewer } from 'ui';

import { Page } from '@/components/Page';

const { Text } = Typography;

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
  infoCard: {
    marginBottom: token.marginMD,
  },
}));

const RobotDemo: React.FC = () => {
  const { styles } = useStyles();
  const [modelLoaded, setModelLoaded] = React.useState(false);

  const handleModelLoad = (model: any) => {
    console.log('模型加载完成:', model);
    setModelLoaded(true);
  };

  return (
    <Page plugin={{ name: '机器人模型查看器', desc: '使用 Three.js 加载和展示 FBX 机器人模型', url: '' }}>
      <Row gutter={16} className={styles.container}>
        <Col span={18}>
          <Card className={styles.viewerContainer} bodyStyle={{ height: '100%', padding: 0 }}>
            <RobotViewer onModelLoad={handleModelLoad} />
          </Card>
        </Col>
        <Col span={6}>
          <Card className={styles.controlPanel} title='控制面板'>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Card size='small' className={styles.infoCard}>
                <Text type='secondary'>模型信息</Text>
                <div style={{ marginTop: 8 }}>
                  <Text>• 格式: FBX</Text>
                  <br />
                  <Text>• 状态: {modelLoaded ? '已加载' : '加载中...'}</Text>
                  <br />
                  <Text>• 渲染引擎: Three.js</Text>
                </div>
              </Card>

              <Card size='small' className={styles.infoCard}>
                <Text type='secondary'>操作说明</Text>
                <div style={{ marginTop: 8 }}>
                  <Text>• 左键拖拽: 旋转视角</Text>
                  <br />
                  <Text>• 右键拖拽: 平移视角</Text>
                  <br />
                  <Text>• 滚轮: 缩放</Text>
                  <br />
                  <Text>• 重置视角: 点击按钮</Text>
                </div>
              </Card>
            </div>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default RobotDemo;
