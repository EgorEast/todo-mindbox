import { Radio, Button } from 'antd'
import React from 'react'
import type { RadioChangeEvent } from 'antd'

export interface TodoListFooterProps {
  leftCount: number
  viewMode: 'all' | 'done' | 'left'
  onClickClearCompleted: React.MouseEventHandler<HTMLElement>
  handleViewModeChange: (event: RadioChangeEvent) => void
}

const TodoListFooter = ({
  leftCount,
  viewMode,
  onClickClearCompleted,
  handleViewModeChange,
}: TodoListFooterProps) => (
  <div>
    {leftCount > 0 && <div>left items: {leftCount}</div>}
    <Radio.Group size='small' value={viewMode} onChange={handleViewModeChange}>
      <Radio.Button value='all'>all</Radio.Button>
      <Radio.Button value='done'>done</Radio.Button>
      <Radio.Button value='left'>left</Radio.Button>
    </Radio.Group>
    <Button
      style={{ border: 'none', backgroundColor: 'transparent' }}
      onClick={onClickClearCompleted}
    >
      clear completed
    </Button>
  </div>
)

export default TodoListFooter
