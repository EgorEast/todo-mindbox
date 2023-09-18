import TodosList from 'components/TodosList'
import styled from 'styled-components'
import 'App.css'

const StyledApp = styled.div`
  top: 0;
  position: absolute;
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;

  background-color: var(--color-background);
`

const StyledTodosHeader = styled.h1`
  font-size: 60px;
  text-align: center;
  font-weight: 200;
  margin: 10px 0;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  letter-spacing: -1px;
  color: var(--color-primary);
`

const StyledTodosContainer = styled.div`
  width: clamp(350px, 40%, 400px);
`

function App() {
  return (
    <StyledApp>
      <StyledTodosContainer>
        <StyledTodosHeader>todos</StyledTodosHeader>
        <TodosList />
      </StyledTodosContainer>
    </StyledApp>
  )
}

export default App
