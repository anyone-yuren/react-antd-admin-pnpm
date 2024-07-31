import { Button } from 'antd'
import React, { useState } from 'react'
import { CreateEditor } from 'ui'

const createeditor = () => {

  const [creating,setCreating] = useState(false)

  return (
    <>
    <Button onClick={()=>{setCreating(true)}}>点我开始创作吧！</Button>
    <CreateEditor type='rect' onFinish={()=>{setCreating(false)}} creating = {creating} fill = "#000000"/>
    </>
  )
}

export default createeditor