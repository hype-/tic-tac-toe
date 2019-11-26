import React, { useCallback } from 'react'
import styled from 'styled-components'

import { Row, Column, Board } from '../../types'
import { Space } from './Space'

interface Props {
  board: Board
  isCompleted: boolean
  onMakeMove: (row: Row, column: Column) => void
}

export function Gameboard({ board, isCompleted, onMakeMove }: Props): JSX.Element {
  const handleClick = useCallback(
    (row: Row, column: Column) => () => {
      onMakeMove(row, column)
    },
    [onMakeMove],
  )

  return (
    <Container>
      <Space
        character={board[Row.A][Column.A]}
        isCompleted={isCompleted}
        onClick={handleClick(Row.A, Column.A)}
      />

      <Space
        character={board[Row.A][Column.B]}
        isCompleted={isCompleted}
        onClick={handleClick(Row.A, Column.B)}
      />

      <Space
        character={board[Row.A][Column.C]}
        isCompleted={isCompleted}
        onClick={handleClick(Row.A, Column.C)}
      />

      <Space
        character={board[Row.B][Column.A]}
        isCompleted={isCompleted}
        onClick={handleClick(Row.B, Column.A)}
      />

      <Space
        character={board[Row.B][Column.B]}
        isCompleted={isCompleted}
        onClick={handleClick(Row.B, Column.B)}
      />

      <Space
        character={board[Row.B][Column.C]}
        isCompleted={isCompleted}
        onClick={handleClick(Row.B, Column.C)}
      />

      <Space
        character={board[Row.C][Column.A]}
        isCompleted={isCompleted}
        onClick={handleClick(Row.C, Column.A)}
      />

      <Space
        character={board[Row.C][Column.B]}
        isCompleted={isCompleted}
        onClick={handleClick(Row.C, Column.B)}
      />

      <Space
        character={board[Row.C][Column.C]}
        isCompleted={isCompleted}
        onClick={handleClick(Row.C, Column.C)}
      />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  grid-auto-rows: minmax(100px, auto);
`
