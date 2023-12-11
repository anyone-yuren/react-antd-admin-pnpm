import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import { MwCardProps } from './mw-card'
import { DownOutlined } from '@ant-design/icons'

export default function MwCard(props: MwCardProps) {
  const { collapsible, onCollapse, defaultCollapsed, children, title, extra, collapsePosition = 'extra' } = props
  const [collapsed, setCollapsed] = useState<boolean>(props.collapsed || defaultCollapsed || false)
  const params = { ...props }

  delete params.collapsible
  delete params.defaultCollapsed
  delete params.collapsePosition
  delete params.collapsed
  delete params.onCollapse

  useEffect(() => {
    setCollapsed(props.collapsed || false)
  }, [props.collapsed])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
    if (onCollapse) {
      onCollapse(!collapsed)
    }
  }

  const icon = collapsible ? (
    <DownOutlined className={`mw-card-collapsible-icon ${collapsePosition}`} onClick={toggleCollapsed} />
  ) : null

  return (
    <Card
      {...params}
      className={`mw-card ${collapsed ? 'collapsed' : ''}`}
      title={
        title ? (
          <>
            {collapsePosition === 'title' ? icon : null}
            {title}
          </>
        ) : null
      }
      extra={
        title ? (
          <>
            {extra}
            {collapsePosition === 'extra' ? icon : null}
          </>
        ) : null
      }
    >
      {children}
    </Card>
  )
}
