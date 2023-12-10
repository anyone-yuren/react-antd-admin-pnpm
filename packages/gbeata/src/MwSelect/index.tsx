import { Select } from 'antd';
import React, { forwardRef } from 'react';
import { Option } from '../MwForm/mw-form';
import { omitObj } from '../utils';
import { GSelectProps } from './g-select';

const getOptions = (options: Array<Option> | undefined) => {
  if (!options) {
    return [];
  }
  return options.map((option) => {
    return (
      <Select.Option key={option.value} {...option}>
        {option.label}
      </Select.Option>
    );
  });
};

export default forwardRef(function MwSelect(props: GSelectProps, ref: any) {
  const { options } = props;
  return (
    <Select ref={ref} {...omitObj(props, 'options')}>
      {getOptions(options)}
    </Select>
  );
});
