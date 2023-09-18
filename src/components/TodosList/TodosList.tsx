import { CaretDownOutlined } from '@ant-design/icons'
import { Input, List } from 'antd'
import TodoItem from 'components/TodoItem'
import TodoListFooter from 'components/TodoListFooter'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import type { RadioChangeEvent } from 'antd'
import type { TodoProps } from 'components/TodoItem'
import 'App.css'

const StyledTodosList = styled(List)`
  background-color: var(--color-white);
  box-shadow: 0 5px 10px var(--color-disabled);
`

enum ViewMode {
  All = 'all',
  Done = 'done',
  Left = 'left',
}

const LOCAL_STORAGE_KEY = 'todos'

const TodosList = () => {
  const initialValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]') as TodoProps[]

  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState<TodoProps[]>(initialValue)
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.All)

  const addItemToActive = (newItem: TodoProps) => setTodos(prev => [...prev, newItem])

  // можно обернуть в useMemo, но вряд-ли здесь будет миллион тудушек)
  const { leftItems, doneItems } = todos.reduce<{
    leftItems: TodoProps[]
    doneItems: TodoProps[]
  }>(
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

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  return (
    <StyledTodosList
      header={
        <Input
          value={inputValue}
          bordered={false}
          placeholder='What needs to be done?'
          prefix={
            <CaretDownOutlined
              disabled
              style={{ color: inputValue ? 'var(--color-black)' : 'var(--color-disabled)' }}
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
      dataSource={
        { [ViewMode.All]: todos, [ViewMode.Done]: doneItems, [ViewMode.Left]: leftItems }[viewMode]
      }
      renderItem={({ text, checked, id }) => (
        <TodoItem
          id={id}
          checked={checked}
          text={text}
          onClick={() => changeChecked({ id, checked })}
        />
      )}
    />
  )
}

export default TodosList
