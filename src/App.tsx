import { CaretDownOutlined } from '@ant-design/icons'
import { Input, List } from 'antd'
import TodoItem from 'components/TodoItem'
import TodoListFooter from 'components/TodoListFooter'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import type { RadioChangeEvent } from 'antd'
import type { TodoProps } from 'components/TodoItem'
import 'App.scss'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState<TodoProps[]>([])
  const [viewMode, setViewMode] = useState<'all' | 'done' | 'left'>('all')

  const addItemToActive = (newItem: TodoProps) => setTodos(prev => [...prev, newItem])

  // можно обернуть в useMemo, но вряд-ли здесь будет миллион тудушек)
  const { leftItems, doneItems } = todos.reduce<{ leftItems: TodoProps[]; doneItems: TodoProps[] }>(
    (acc, currentValue) => {
      if (currentValue.checked) return { ...acc, doneItems: [...acc.doneItems, currentValue] }

      return { ...acc, leftItems: [...acc.leftItems, currentValue] }
    },
    { leftItems: [], doneItems: [] },
  )

  const handleViewModeChange = (event: RadioChangeEvent) => {
    setViewMode(event.target.value)
  }

  const changeChecked = ({ id, checked }: { id: string; checked: boolean }) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id !== id) return todo

        return { ...todo, checked: !checked }
      }),
    )
  }

  const onKeyDownInput: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key !== 'Enter' || !inputValue) return

    addItemToActive({ id: uuid(), text: inputValue, checked: false })

    setInputValue('')
  }
  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = event =>
    setInputValue(event.target.value)

  const onClickClearCompleted: React.MouseEventHandler<HTMLElement> = () =>
    setTodos(prevTodos => prevTodos.filter(({ checked }) => !checked))

  return (
    <div className='app'>
      <div className='todos'>
        <h1 className='todos__header'>todos</h1>
        <List
          header={
            <Input
              value={inputValue}
              bordered={false}
              placeholder='What needs to be done?'
              prefix={
                <CaretDownOutlined
                  disabled
                  style={{ color: inputValue ? '#000' : 'var(--color-disabled)' }}
                />
              }
              onChange={onChangeInput}
              onKeyDown={onKeyDownInput}
            />
          }
          footer={
            <TodoListFooter
              leftCount={leftItems.length}
              viewMode={viewMode}
              onClickClearCompleted={onClickClearCompleted}
              handleViewModeChange={handleViewModeChange}
            />
          }
          dataSource={{ all: todos, done: doneItems, left: leftItems }[viewMode]}
          renderItem={({ text, checked, id }) => (
            <TodoItem
              id={id}
              checked={checked}
              text={text}
              onClick={() => changeChecked({ id, checked })}
            />
          )}
        />
      </div>
    </div>
  )
}

export default App
