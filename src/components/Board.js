import React from 'react'
import styled from 'styled-components'

const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 100px));
  grid-template-rows: repeat(4, minmax(50px, 100px));
  max-width: 300px;
  width: 100%;
  & div {
    text-align: center;
    user-select: none;
  }
`
const PlayBtn = styled.button`
  background-color: transparent;
  border: #5ed468 3px solid;
  border-radius: 3px;
  color: #5ed468;
  cursor: pointer;
  display: inline-block;
  font-size: 1.3rem;
  grid-column: 1 / -1;
  margin: 1rem auto;
  padding: 0.5em 0;
  transition: all 0.5s ease-in;
  width: 11rem;
  &:hover,
  &:active {
    background-color: #5ed468;
    color: #fafafa;
    transition: all 0.5s ease-out;
  }
`

const Squ = styled.div`
  --grid-width: 3px;
  align-items: center;
  border-color: black;
  border-style: solid;
  border-width: 0;
  cursor: pointer;
  display: flex;
  font-size: 2.5rem;
  font-weight: 700;
  height: 100%;
  justify-content: center;
  width: 100%;
  ${props =>
    [3, 4, 5].includes(props.num)
      ? 'border-top-width: var(--grid-width); border-bottom-width: var(--grid-width);'
      : ''}

  ${props =>
    [1, 4, 7].includes(props.num)
      ? 'border-left-width: var(--grid-width); border-right-width: var(--grid-width);'
      : ''}
  ${props => (props.disableGame ? 'pointer-events: none;' : '')}
  color: ${props => (props.children.props.children === 'X' ? '#e26458' : '#2899e0')};
`
const winningMatch = spots => {
  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const win = winners.map(row => {
    const [a, b, c] = row
    return spots.includes(a) && spots.includes(b) && spots.includes(c)
  })
  return win.includes(true)
}

class Board extends React.Component {
  state = {
    squ: Array(9).fill(null)
  }

  clickOnSquare = async i => {
    if (this.state.squ[i] !== null) {
      return
    }
    const marker = this.props.xTurn ? 'X' : 'O'
    await this.setState(prevState => {
      const squ = [...prevState.squ]
      squ[i] = marker
      return { squ }
    })
    const currentSpots = this.state.squ.reduce((acc, current, i) => {
      if (current === marker) {
        return [...acc, i]
      }
      return acc
    }, [])

    const threeInARow = winningMatch(currentSpots)
    if (threeInARow) {
      this.props.handlePlayOn(false)
      this.props.handleWinner(true)
    } else {
      this.state.squ.includes(null) || this.props.handlePlayOn(false)
      this.props.handleChangeTurn()
    }
  }

  render() {
    return (
      <BoardWrapper>
        {this.state.squ.map((o, i) => (
          <Squ
            key={i}
            num={i}
            onClick={() => this.clickOnSquare(i)}
            disableGame={!this.props.playon}>
            <div>{this.state.squ[i]}</div>
          </Squ>
        ))}

        <PlayBtn
          style={this.props.playon ? { visibility: 'hidden' } : { visibility: 'visible' }}
          onClick={() => {
            this.setState({ squ: Array(9).fill(null) })
            this.props.handleRestart()
          }}>
          New Game ?
        </PlayBtn>
      </BoardWrapper>
    )
  }
}

export default Board
