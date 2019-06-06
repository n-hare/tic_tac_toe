import React from 'react'
import styled from 'styled-components'
import Game from './components/Game'
const GameWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`

class App extends React.Component {
  render() {
    return (
      <GameWrapper>
        <Game />
      </GameWrapper>
    )
  }
}

export default App
