import { Radio, Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import type { RadioChangeEvent } from 'antd'

const StyledContainer = styled.div`
  padding: 0 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledCompletedButton = styled(Button)`
  border: none;
  background-color: transparent;
`

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
  <StyledContainer>
    {leftCount > 0 && <div>left items: {leftCount}</div>}
    <Radio.Group size='small' value={viewMode} onChange={handleViewModeChange}>
      <Radio.Button value='all'>all</Radio.Button>
      <Radio.Button value='done'>done</Radio.Button>
      <Radio.Button value='left'>left</Radio.Button>
    </Radio.Group>
    <StyledCompletedButton onClick={onClickClearCompleted}>clear completed</StyledCompletedButton>
  </StyledContainer>
)

export default TodoListFooter
