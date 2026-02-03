import { Button, Card, Space, Switch } from 'antd';
import React from 'react';
import { Loading } from 'ui';

export default function LoadingTest() {
  const [loading, setLoading] = React.useState(true);
  const [fullscreen, setFullscreen] = React.useState(false);

  return (
    <div style={{ padding: '24px' }}>
      <h2>Loading 组件演示</h2>

      <Card title='基础用法' style={{ marginBottom: '24px' }}>
        <Space direction='vertical' size='large' style={{ width: '100%' }}>
          <div>
            <Switch checked={loading} onChange={(e) => setLoading(e)} />
            <span style={{ marginLeft: 8 }}>加载状态</span>
          </div>

          <div style={{ border: '1px dashed #ccc', padding: '40px', minHeight: '200px' }}>
            <Loading loading={loading} tip='数据加载中...' size='large'>
              <div style={{ padding: '20px', background: '#f0f2f5', borderRadius: '8px' }}>
                <h3>内容区域</h3>
                <p>当loading为false时，这里会显示实际内容</p>
                <p>当前时间: {new Date().toLocaleString()}</p>
              </div>
            </Loading>
          </div>
        </Space>
      </Card>

      <Card title='不同尺寸' style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div
            style={{ flex: 1, minWidth: '200px', border: '1px solid #e8e8e8', padding: '20px', borderRadius: '8px' }}
          >
            <h4>Small Size</h4>
            <Loading size='small' tip='小尺寸加载' />
          </div>
          <div
            style={{ flex: 1, minWidth: '200px', border: '1px solid #e8e8e8', padding: '20px', borderRadius: '8px' }}
          >
            <h4>Default Size</h4>
            <Loading size='default' tip='默认尺寸加载' />
          </div>
          <div
            style={{ flex: 1, minWidth: '200px', border: '1px solid #e8e8e8', padding: '20px', borderRadius: '8px' }}
          >
            <h4>Large Size</h4>
            <Loading size='large' tip='大尺寸加载' />
          </div>
        </div>
      </Card>

      <Card title='自定义颜色' style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div
            style={{ flex: 1, minWidth: '200px', border: '1px solid #e8e8e8', padding: '20px', borderRadius: '8px' }}
          >
            <h4>Blue</h4>
            <Loading color='#1890ff' />
          </div>
          <div
            style={{ flex: 1, minWidth: '200px', border: '1px solid #e8e8e8', padding: '20px', borderRadius: '8px' }}
          >
            <h4>Green</h4>
            <Loading color='#52c41a' />
          </div>
          <div
            style={{ flex: 1, minWidth: '200px', border: '1px solid #e8e8e8', padding: '20px', borderRadius: '8px' }}
          >
            <h4>Red</h4>
            <Loading color='#ff4d4f' />
          </div>
          <div
            style={{ flex: 1, minWidth: '200px', border: '1px solid #e8e8e8', padding: '20px', borderRadius: '8px' }}
          >
            <h4>Purple</h4>
            <Loading color='#722ed1' />
          </div>
        </div>
      </Card>

      <Card title='全屏加载' style={{ marginBottom: '24px' }}>
        <Space>
          <Switch checked={fullscreen} onChange={(e) => setFullscreen(e)} />
          <span>全屏模式</span>
          <Button type='primary' onClick={() => setFullscreen(true)}>
            开启全屏加载
          </Button>
        </Space>
        <Loading loading={fullscreen} fullscreen tip='全屏加载中，请稍候...' />
      </Card>

      <Card title='包裹内容'>
        <div style={{ border: '1px solid #e8e8e8', padding: '20px', borderRadius: '8px' }}>
          <Loading loading={loading} tip='加载中...'>
            <div>
              <h3>这是被包裹的内容</h3>
              <p>当 loading 为 true 时，显示加载动画</p>
              <p>当 loading 为 false 时，显示此内容</p>
            </div>
          </Loading>
        </div>
      </Card>

      <Card title='API 文档' style={{ marginTop: '24px' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#fafafa' }}>
              <th
                style={{
                  border: '1px solid #e8e8e8',
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: 600,
                }}
              >
                属性名
              </th>
              <th
                style={{
                  border: '1px solid #e8e8e8',
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: 600,
                }}
              >
                描述
              </th>
              <th
                style={{
                  border: '1px solid #e8e8e8',
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: 600,
                }}
              >
                类型
              </th>
              <th
                style={{
                  border: '1px solid #e8e8e8',
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: 600,
                }}
              >
                默认值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>loading</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>加载状态</td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>boolean</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>true</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>tip</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>加载提示文字</td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>string</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>'加载中...'</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>size</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>加载动画大小</td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>
                  'small' | 'default' | 'large'
                </code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>'default'</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>color</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>加载动画颜色</td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>string</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>'#1890ff'</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>fullscreen</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>是否全屏遮罩</td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>boolean</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>false</code>
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>className</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>自定义类名</td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>string</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>style</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>自定义样式</td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>
                  React.CSSProperties
                </code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>children</code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>子元素内容</td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>
                <code style={{ backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>
                  React.ReactNode
                </code>
              </td>
              <td style={{ border: '1px solid #e8e8e8', padding: '12px 16px' }}>-</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
