import React from 'react'
import Board from './Board'
class Game extends React.Component {
  state = {
    xTurn: true,
    playon: true,
    winner: false
  }
  playingHeading() {
    if (!this.state.winner) {
      if (this.state.playon) {
        return `Current Player: ${this.state.xTurn ? 'X' : 'O'}`
      } else {
        return 'Tie! Cat’s Game'
      }
    }
    return `Winner! ${this.state.xTurn ? 'X' : 'O'}’s Win `
  }
  render() {
    return (
      <React.Fragment>
        <h2>{this.playingHeading()}</h2>
        <Board
          xTurn={this.state.xTurn}
          handleChangeTurn={(boo = null) =>
            this.setState(prevState => {
              const b = boo === null ? !prevState.xTurn : boo
              return { xTurn: b }
            })
          }
          handlePlayOn={boo => this.setState({ playon: boo })}
          handleWinner={boo => this.setState({ winner: boo })}
          handleRestart={() => this.setState({ xTurn: true, playon: true, winner: false })}
          playon={this.state.playon}
        />
      </React.Fragment>
    )
  }
}

export default Game
