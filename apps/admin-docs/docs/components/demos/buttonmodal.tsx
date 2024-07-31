import { Space } from 'antd'
import React from 'react'
import { ButtonModal } from 'ui'

export default () => {
  return (
    <Space>
    <ButtonModal buttonProps = {{text:'hello'}} modalProps = {{title:"Hello World"}}>
      你好，世界
    </ButtonModal>
    <ButtonModal buttonProps = {{text:'hello',type:"primary"}} modalProps = {{title:"Hello World"}}>
      你好，世界
    </ButtonModal>
    </Space>
  )
}