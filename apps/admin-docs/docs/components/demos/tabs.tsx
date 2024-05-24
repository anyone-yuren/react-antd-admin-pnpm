import { Tabs } from 'ui';
import React from 'react';


const onChange = (key: string) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: <><span style={{ color: 'red' }}>Content of Tab Pane 3
     </span></>,
  },
];

export default () => {
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};
