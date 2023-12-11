import { Select } from 'antd';
import React, { forwardRef } from 'react';
import { Option } from '../GForm/g-form';
import { omitObj } from '../utils';
import { MwSelectProps } from './mw-select';

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

export default forwardRef(function MwSelect(props: MwSelectProps, ref: any) {
  const { options } = props;
  return (
    <Select ref={ref} {...omitObj(props, 'options')}>
      {getOptions(options)}
    </Select>
  );
});
