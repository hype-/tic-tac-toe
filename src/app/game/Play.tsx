import React from 'react'
import styled from 'styled-components'

import { Gameboard } from './board/Gameboard'
import { Turn, Row, Column, Maybe, Winner, Board } from '../types'

interface Props {
  playerName: string
  turn: Turn
  board: Board
  winner: Maybe<Winner>
  onMakeMove: (row: Row, column: Column) => void
  onResetGame: () => void
  onResetBoard: () => void
}

export function Play({
  playerName,
  turn,
  board,
  winner,
  onMakeMove,
  onResetGame,
  onResetBoard,
}: Props): JSX.Element {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <Subtitle>Hi {playerName}!</Subtitle>

          <Button onClick={onResetGame}>Reset game</Button>
        </HeaderContent>

        <HeaderContent>
          <Button onClick={onResetBoard}>Reset board</Button>
        </HeaderContent>
      </Header>

      {winner != null && (
        <>
          {winner === Winner.PLAYER && <Text>You win!</Text>}
          {winner === Winner.COMPUTER && <Text>You lose!</Text>}
          {winner === Winner.TIE && <Text>It's a tie!</Text>}
        </>
      )}

      {winner == null && (
        <>
          {turn === Turn.PLAYER && <Text>Make your move..</Text>}
          {turn === Turn.COMPUTER && <Text>Computers turn..</Text>}
        </>
      )}

      <Gameboard board={board} isCompleted={winner != null} onMakeMove={onMakeMove} />
    </Container>
  )
}

const Container = styled.div``

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Button = styled.button`
  height: 2rem;
  paddin: 0.5rem;
`

const Subtitle = styled.h2`
  margin-right: 2rem;
`

const Text = styled.p`
  font-size: 2rem;
`
