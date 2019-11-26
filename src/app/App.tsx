import React, { useCallback, useReducer } from 'react'
import styled from 'styled-components'

import { Start } from './start/Start'
import { Play } from './game/Play'
import {
  hasCharacterWon,
  makePlayerMove,
  canPlayerMakeMove,
  makeComputerMove,
  getEmptyPositionsCount,
} from './game/util'
import { Character, Turn, Winner, Row, Column } from './types'
import {
  reducer,
  initialState,
  initialize,
  setPlayerAction,
  resetGameAction,
  resetBoardAction,
  setBoardAction,
  setWinnerAction,
  setTurnAction,
} from './state'

const COMPUTER_TURN_TIME = 500 // milliseconds

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState, initialize)
  const { player, board, turn, winner } = state

  const handleEnterPlayer = useCallback((name: string, character: Character) => {
    dispatch(setPlayerAction(name, character))
  }, [])

  const handleResetGame = useCallback(() => {
    dispatch(resetGameAction())
  }, [])

  const handleResetBoard = useCallback(() => {
    dispatch(resetBoardAction())
  }, [])

  const handleMakeMove = useCallback(
    (row: Row, column: Column) => {
      if (player && canPlayerMakeMove(board, row, column, turn, winner)) {
        const playerBoard = makePlayerMove(board, player.character, row, column)

        dispatch(setBoardAction(playerBoard))

        if (hasCharacterWon(playerBoard, player.character)) {
          dispatch(setWinnerAction(Winner.PLAYER))
        } else {
          dispatch(setTurnAction(Turn.COMPUTER))

          setTimeout(() => {
            const emptyPositionsCount = getEmptyPositionsCount(playerBoard)

            if (emptyPositionsCount > 0) {
              const computerCharacter = player.character === Character.X ? Character.O : Character.X

              const computerBoard = makeComputerMove(
                playerBoard,
                computerCharacter,
                emptyPositionsCount,
              )

              dispatch(setBoardAction(computerBoard))

              if (hasCharacterWon(computerBoard, computerCharacter)) {
                dispatch(setWinnerAction(Winner.COMPUTER))
              } else {
                dispatch(setTurnAction(Turn.PLAYER))
              }
            } else {
              dispatch(setWinnerAction(Winner.TIE))
            }
          }, COMPUTER_TURN_TIME)
        }
      }
    },
    [player, board, turn, winner],
  )

  return (
    <Container>
      <header>
        <Title>Tic-tac-toe</Title>
      </header>

      {!player && <Start onSubmit={handleEnterPlayer} />}

      {player && (
        <Play
          playerName={player.name}
          turn={turn}
          board={board}
          winner={winner}
          onMakeMove={handleMakeMove}
          onResetGame={handleResetGame}
          onResetBoard={handleResetBoard}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;
  background: #f3b3a6;
  color: #1f0812;
  width: 75%;
  margin: 0 auto;
`

const Title = styled.h1`
  color: #1f0812;
`
