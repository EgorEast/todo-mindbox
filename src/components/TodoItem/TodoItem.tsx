import { List, Checkbox } from 'antd'

export interface TodoProps {
  id: string
  text: string
  checked: boolean
}

interface TodoItemProps extends TodoProps {
  onClick?: React.MouseEventHandler<HTMLElement>
}

const TodoItem = ({ text, checked, onClick }: TodoItemProps) => (
  <List.Item style={{ justifyContent: 'flex-start' }}>
    <Checkbox checked={checked} style={{ borderRadius: '50%' }} onClick={onClick} />
    <div
      style={{
        marginLeft: 10,
        textDecoration: checked ? 'line-through' : '',
        color: checked ? 'var(--color-disabled)' : '#000',
      }}
    >
      {text}
    </div>
  </List.Item>
)

export default TodoItem
