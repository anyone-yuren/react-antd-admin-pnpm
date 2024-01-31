import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

export const provinceData = ['guangdong', 'Zhejiang', 'Jiangsu'];

export const cityData: Record<string, any> = {
  guangdong: ['guangzhou', 'shenzhen', 'foshan', 'dongguan', 'zhuhai'],
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang', 'wuxi'],
};

export const cascaderData = [
  {
    value: 'zhinan',
    label: t('指南'),
    children: [
      {
        value: 'shejiyuanze',
        label: t('设计原则'),
        children: [
          {
            value: 'yizhi',
            label: t('一致'),
          },
          {
            value: 'fankui',
            label: t('反馈'),
          },
          {
            value: 'xiaolv',
            label: t('效率'),
          },
          {
            value: 'kekong',
            label: t('可控'),
          },
        ],
      },
      {
        value: 'daohang',
        label: t('导航'),
        children: [
          {
            value: 'cexiangdaohang',
            label: t('侧向导航'),
          },
          {
            value: 'dingbudaohang',
            label: t('顶部导航'),
          },
        ],
      },
    ],
  },
  {
    value: 'zujian',
    label: t('组件'),
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: t('layout 布局'),
          },
          {
            value: 'color',
            label: t('Color 色彩'),
          },
          {
            value: 'typography',
            label: t('Typography 字体'),
          },
          {
            value: 'icon',
            label: t('Icon 图标'),
          },
          {
            value: 'button',
            label: t('Button 按钮'),
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: t('Radio 单选框'),
          },
          {
            value: 'checkbox',
            label: t('Checkbox 多选框'),
          },
          {
            value: 'input',
            label: t('Input 输入框'),
          },
          {
            value: 'input-number',
            label: t('InputNumber 计数器'),
          },
          {
            value: 'select',
            label: t('Select 选择器'),
          },
          {
            value: 'cascader',
            label: t('Cascader 级联选择器'),
          },
          {
            value: 'switch',
            label: t('Switch 开关'),
          },
          {
            value: 'slider',
            label: t('Slider 滑块'),
          },
          {
            value: 'time-picker',
            label: t('TimePicker 时间选择器'),
          },
          {
            value: 'date-picker',
            label: t('DatePicker 日期选择器'),
          },
          {
            value: 'datetime-picker',
            label: t('DateTimePicker 日期时间选择器'),
          },
          {
            value: 'upload',
            label: t('Upload 上传'),
          },
          {
            value: 'rate',
            label: t('Rate 评分'),
          },
          {
            value: 'form',
            label: t('Form 表单'),
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: t('Table 表格'),
          },
          {
            value: 'tag',
            label: t('Tag 标签'),
          },
          {
            value: 'progress',
            label: t('Progress 进度条'),
          },
          {
            value: 'tree',
            label: t('Tree 树形控件'),
          },
          {
            value: 'pagination',
            label: t('Pagination 分页'),
          },
          {
            value: 'badge',
            label: t('Badge 标记'),
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: t('Alert 警告'),
          },
          {
            value: 'loading',
            label: t('Loading 加载'),
          },
          {
            value: 'message',
            label: t('Message 消息提示'),
          },
          {
            value: 'message-box',
            label: t('MessageBox 弹框'),
          },
          {
            value: 'notification',
            label: t('Notification 通知'),
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: t('NavMenu 导航菜单'),
          },
          {
            value: 'tabs',
            label: t('Tabs 标签页'),
          },
          {
            value: 'breadcrumb',
            label: t('Breadcrumb 面包屑'),
          },
          {
            value: 'dropdown',
            label: t('Dropdown 下拉菜单'),
          },
          {
            value: 'steps',
            label: t('Steps 步骤条'),
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: t('Dialog 对话框'),
          },
          {
            value: 'tooltip',
            label: t('Tooltip 文字提示'),
          },
          {
            value: 'popover',
            label: t('Popover 弹出框'),
          },
          {
            value: 'card',
            label: t('Card 卡片'),
          },
          {
            value: 'carousel',
            label: t('Carousel 走马灯'),
          },
          {
            value: 'collapse',
            label: t('Collapse 折叠面板'),
          },
        ],
      },
    ],
  },
  {
    value: 'ziyuan',
    label: t('资源'),
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'jiaohu',
        label: t('组件交互文档'),
      },
    ],
  },
];

export const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        children: [
          {
            title: 'Child Node6',
            value: '0-0-1',
          },
        ],
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        disabled: true,
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
      },
    ],
  },
];

export const radioData = [
  { label: t('免费'), value: 'free' },
  { label: t('收费'), value: 'fee' },
  { label: t('赞助'), value: 'sponsor' },
  { label: t('线上'), value: 'online', disabled: true },
  { label: t('线下'), value: 'offline', disabled: true },
];

export const checkboxData = [
  { label: t('游泳'), value: 'swim' },
  { label: t('跑步'), value: 'run' },
  { label: t('健身'), value: 'fit' },
  { label: t('阅读'), value: 'read', disabled: true },
  { label: t('音乐'), value: 'music', disabled: true },
  { label: t('电影'), value: 'movie' },
];
