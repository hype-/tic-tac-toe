import { Row, Column, Board, Character, Turn, Winner, Maybe } from '../types'

export function makePlayerMove(
  board: Board,
  character: Character,
  row: Row,
  column: Column,
): Board {
  const copiedBoard = copyBoard(board)

  copiedBoard[row][column] = character

  return copiedBoard
}

function copyBoard(board: Board): Board {
  return [
    [board[Row.A][Column.A], board[Row.A][Column.B], board[Row.A][Column.C]],
    [board[Row.B][Column.A], board[Row.B][Column.B], board[Row.B][Column.C]],
    [board[Row.C][Column.A], board[Row.C][Column.B], board[Row.C][Column.C]],
  ]
}

export function hasCharacterWon(board: Board, character: Character): boolean {
  const combinations = [
    board[Row.A],
    board[Row.B],
    board[Row.C],
    [board[Row.A][Column.A], board[Row.B][Column.A], board[Row.C][Column.A]],
    [board[Row.A][Column.B], board[Row.B][Column.B], board[Row.C][Column.B]],
    [board[Row.A][Column.C], board[Row.B][Column.C], board[Row.C][Column.C]],
    [board[Row.A][Column.A], board[Row.B][Column.B], board[Row.C][Column.C]],
    [board[Row.A][Column.C], board[Row.B][Column.B], board[Row.C][Column.A]],
  ]

  return combinations.some(([a, b, c]) => {
    return a === character && a === b && b === c
  })
}

export function canPlayerMakeMove(
  board: Board,
  row: Row,
  column: Column,
  turn: Turn,
  winner: Maybe<Winner>,
): boolean {
  return turn === Turn.PLAYER && winner == null && board[row][column] == null
}

export function getEmptyPositionsCount(board: Board): number {
  return board.reduce((acc, rows) => {
    return acc + rows.filter(mark => mark == null).length
  }, 0)
}

export function makeComputerMove(
  board: Board,
  character: Character,
  emptyPositionsCount: number,
): Board {
  const position = Math.floor(Math.random() * 100) % emptyPositionsCount

  let emptyIndex = 0

  const newBoard = board.map(row => {
    return row.map(mark => {
      if (mark == null) {
        const computerMark = position === emptyIndex ? character : null

        emptyIndex++

        return computerMark
      }

      return mark
    })
  })

  return [
    [newBoard[Row.A][Column.A], newBoard[Row.A][Column.B], newBoard[Row.A][Column.C]],
    [newBoard[Row.B][Column.A], newBoard[Row.B][Column.B], newBoard[Row.B][Column.C]],
    [newBoard[Row.C][Column.A], newBoard[Row.C][Column.B], newBoard[Row.C][Column.C]],
  ]
}
