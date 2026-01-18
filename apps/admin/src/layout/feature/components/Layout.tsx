import { Segmented } from 'antd';
import { useTheme } from 'antd-style';
import { useState } from 'react';

import SvgIcon from '@/components/SvgIcon';

import type { SegmentedLabeledOption, SegmentedValue } from 'antd/lib/segmented';

export default function LayoutSettings() {
  const [value, setValue] = useState<SegmentedValue>('1');
  const token = useTheme();
  const options: SegmentedLabeledOption[] = [
    {
      label: (
        <div style={{ padding: '16px', color: value === '1' ? token.colorPrimary : token.colorText }}>
          <SvgIcon name='fill' size={32} />
        </div>
      ),
      value: '1',
    },
    {
      label: (
        <div style={{ padding: '16px', color: value === '2' ? token.colorPrimary : token.colorText }}>
          <SvgIcon name='filling' size={32} />
        </div>
      ),
      value: '2',
    },
    {
      label: (
        <div style={{ padding: '16px', color: value === '3' ? token.colorPrimary : token.colorText }}>
          <SvgIcon name='topFill' size={32} />
        </div>
      ),
      value: '3',
    },
  ];
  return (
    <Segmented
      style={{
        backgroundColor: token.colorBgContainerDisabled,
      }}
      block
      value={value}
      onChange={(v) => setValue(v)}
      options={options}
    />
  );
}
