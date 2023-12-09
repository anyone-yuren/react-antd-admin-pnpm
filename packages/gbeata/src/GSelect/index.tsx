import React, { forwardRef } from 'react'
import { Select } from 'antd'
import { Option } from '../MwForm/mw-form'
import { MwSelectProps } from './mw-select'
import { omitObj } from '../utils'

const getOptions = (options: Array<Option> | undefined) => {
  if (!options) {
    return []
  }
  return options.map(option => {
    return (
      <Select.Option key={option.value} {...option}>
        {option.label}
      </Select.Option>
    )
  })
}

export default forwardRef(function MwSelect(props: MwSelectProps, ref: any) {
  const { options } = props
  return (
    <Select ref={ref} {...omitObj(props, 'options')}>
      {getOptions(options)}
    </Select>
  )
})
