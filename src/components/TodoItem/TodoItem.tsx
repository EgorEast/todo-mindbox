import { List, Checkbox } from 'antd'
import styled, { css } from 'styled-components'

const StyledText = styled.div<{ checked: boolean }>`
  margin-left: 10px;
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ checked }) => css`
    text-decoration: ${checked && 'line-through'};
    color: var(${checked ? '--color-disabled' : '--color-black'});
  `}
`

export interface TodoProps {
  id: string
  text: string
  checked: boolean
}

interface TodoItemProps extends TodoProps {
  onClick?: React.MouseEventHandler<HTMLElement>
}

const TodoItem = ({ text, checked, onClick }: TodoItemProps) => (
  <List.Item style={{ justifyContent: 'flex-start', paddingLeft: 10, paddingRight: 10 }}>
    <Checkbox checked={checked} style={{ borderRadius: '50%' }} onClick={onClick} />
    <StyledText checked={checked} title={text} onCopy={() => navigator.clipboard.writeText(text)}>
      {text}
    </StyledText>
  </List.Item>
)

export default TodoItem
