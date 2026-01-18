import { Loading } from 'ui';
import { Center } from 'react-layout-kit';
import React from 'react';
import { Button, Space, Switch, Card, Radio, ColorPicker, Input } from 'antd';

export default () => {
  const [loading, setLoading] = React.useState(true);
  const [fullscreen, setFullscreen] = React.useState(false);
  const [size, setSize] = React.useState<'small' | 'default' | 'large'>('default');
  const [color, setColor] = React.useState('#1890ff');
  const [tip, setTip] = React.useState('加载中...');

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* API 属性控制面板 */}
      <Card title="API 属性配置" style={{ marginBottom: '16px' }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {/* loading 属性 */}
          <div>
            <Space>
              <Switch checked={loading} onChange={(e) => setLoading(e)} />
              <strong>loading:</strong> <span>{loading ? 'true' : 'false'}</span>
              <span style={{ color: '#999' }}>// 加载状态 | boolean | 默认值: true</span>
            </Space>
          </div>

          {/* fullscreen 属性 */}
          <div>
            <Space>
              <Switch checked={fullscreen} onChange={(e) => setFullscreen(e)} />
              <strong>fullscreen:</strong> <span>{fullscreen ? 'true' : 'false'}</span>
              <span style={{ color: '#999' }}>// 是否全屏遮罩 | boolean | 默认值: false</span>
            </Space>
          </div>

          {/* size 属性 */}
          <div>
            <Space>
              <strong>size:</strong>
              <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
                <Radio.Button value="small">small</Radio.Button>
                <Radio.Button value="default">default</Radio.Button>
                <Radio.Button value="large">large</Radio.Button>
              </Radio.Group>
              <span style={{ color: '#999' }}>// 加载动画大小 | 'small' | 'default' | 'large' | 默认值: 'default'</span>
            </Space>
          </div>

          {/* color 属性 */}
          <div>
            <Space>
              <strong>color:</strong>
              <ColorPicker value={color} onChange={(value) => setColor(value.toHexString())} />
              <span>{color}</span>
              <span style={{ color: '#999' }}>// 加载动画颜色 | string | 默认值: '#1890ff'</span>
            </Space>
          </div>

          {/* tip 属性 */}
          <div>
            <Space>
              <strong>tip:</strong>
              <Input value={tip} onChange={(e) => setTip(e.target.value)} style={{ width: 200 }} />
              <span style={{ color: '#999' }}>// 加载提示文字 | string | 默认值: '加载中...'</span>
            </Space>
          </div>
        </Space>
      </Card>

      {/* Loading 组件演示 */}
      <Card title="Loading 组件演示">
        <Center style={{ height: '30vh', border: '1px dashed #ccc', borderRadius: '8px' }}>
          <Loading
            loading={loading}
            fullscreen={fullscreen}
            tip={tip}
            size={size}
            color={color}
          >
            <div style={{ padding: '20px', background: '#f0f2f5', borderRadius: '8px' }}>
              <h3>内容区域</h3>
              <p>当 loading 为 false 时，这里会显示实际内容</p>
              <p>当前时间: {new Date().toLocaleString()}</p>
            </div>
          </Loading>
        </Center>
      </Card>

      {/* 快捷操作按钮 */}
      <Card title="快捷操作">
        <Space wrap>
          <Button type="primary" onClick={() => setLoading(!loading)}>
            切换 loading 状态
          </Button>
          <Button onClick={() => setFullscreen(!fullscreen)}>
            切换全屏模式
          </Button>
          <Button onClick={() => setSize('small')}>
            小尺寸
          </Button>
          <Button onClick={() => setSize('default')}>
            默认尺寸
          </Button>
          <Button onClick={() => setSize('large')}>
            大尺寸
          </Button>
          <Button onClick={() => setColor('#1890ff')}>
            蓝色
          </Button>
          <Button onClick={() => setColor('#52c41a')}>
            绿色
          </Button>
          <Button onClick={() => setColor('#ff4d4f')}>
            红色
          </Button>
        </Space>
      </Card>

      {/* API 说明 */}
      <Card title="API 属性说明">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
              <th style={{ padding: '12px', textAlign: 'left', background: '#fafafa' }}>属性名</th>
              <th style={{ padding: '12px', textAlign: 'left', background: '#fafafa' }}>描述</th>
              <th style={{ padding: '12px', textAlign: 'left', background: '#fafafa' }}>类型</th>
              <th style={{ padding: '12px', textAlign: 'left', background: '#fafafa' }}>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px' }}><code>loading</code></td>
              <td style={{ padding: '12px' }}>加载状态</td>
              <td style={{ padding: '12px' }}><code>boolean</code></td>
              <td style={{ padding: '12px' }}><code>true</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px' }}><code>tip</code></td>
              <td style={{ padding: '12px' }}>加载提示文字</td>
              <td style={{ padding: '12px' }}><code>string</code></td>
              <td style={{ padding: '12px' }}><code>'加载中...'</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px' }}><code>size</code></td>
              <td style={{ padding: '12px' }}>加载动画大小</td>
              <td style={{ padding: '12px' }}><code>'small' | 'default' | 'large'</code></td>
              <td style={{ padding: '12px' }}><code>'default'</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px' }}><code>color</code></td>
              <td style={{ padding: '12px' }}>加载动画颜色</td>
              <td style={{ padding: '12px' }}><code>string</code></td>
              <td style={{ padding: '12px' }}><code>'#1890ff'</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px' }}><code>fullscreen</code></td>
              <td style={{ padding: '12px' }}>是否全屏遮罩</td>
              <td style={{ padding: '12px' }}><code>boolean</code></td>
              <td style={{ padding: '12px' }}><code>false</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px' }}><code>className</code></td>
              <td style={{ padding: '12px' }}>自定义类名</td>
              <td style={{ padding: '12px' }}><code>string</code></td>
              <td style={{ padding: '12px' }}><code>-</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: '12px' }}><code>style</code></td>
              <td style={{ padding: '12px' }}>自定义样式</td>
              <td style={{ padding: '12px' }}><code>React.CSSProperties</code></td>
              <td style={{ padding: '12px' }}><code>-</code></td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}><code>children</code></td>
              <td style={{ padding: '12px' }}>子元素内容</td>
              <td style={{ padding: '12px' }}><code>React.ReactNode</code></td>
              <td style={{ padding: '12px' }}><code>-</code></td>
            </tr>
          </tbody>
        </table>
      </Card>
    </Space>
  );
};

