import { Switch } from 'antd';
import { GButton, GForm, GFormField } from 'gbeata';
import React, { useState } from 'react';
import './gbeata-init';

const fields: Array<GFormField> = [
  {
    title: '角色',
    key: 'chara',
    type: 'select',
    options: [
      {
        label: '阿米娅',
        value: 'gbeata',
      },
      {
        label: '能天使',
        value: 'exusiai',
      },
    ],
  },
  {
    title: '职业选择',
    type: 'job-select',
    key: 'job',
  },
  // 注册过后，可以同时存在多个
  {
    title: '职业选择2',
    type: 'job-select',
    key: 'job2',
  },
];

export default function RegisterCascaderFieldDemo() {
  const [readonly, setReadonly] = useState<boolean>(false);

  const handleConfirm = (form: any) => {
    console.log(form);
    alert(JSON.stringify(form));
  };

  return (
    <>
      <p>
        <label style={{ marginRight: 4 }}>只读模式</label>
        <Switch
          defaultChecked={readonly}
          onChange={(value) => setReadonly(value)}
        />
      </p>
      <GForm
        readonly={readonly}
        fields={fields}
        style={{ width: 400, margin: '0 auto' }}
        onConfirm={handleConfirm}
      >
        <GButton type="primary" htmlType="submit" style={{ marginLeft: 120 }}>
          提交
        </GButton>
      </GForm>
    </>
  );
}
