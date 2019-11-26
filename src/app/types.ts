export type Maybe<T> = T | null

export interface State
  extends Readonly<{
    player: Maybe<Player>
    board: Board
    turn: Turn
    winner: Maybe<Winner>
  }> {}

export interface Player
  extends Readonly<{
    name: string
    character: Character
  }> {}

export enum Character {
  X = 'X',
  O = 'O',
}

export interface Board
  extends Readonly<[[Mark, Mark, Mark], [Mark, Mark, Mark], [Mark, Mark, Mark]]> {}

type Mark = Maybe<Character>

export const EMPTY_BOARD: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

export enum Turn {
  PLAYER,
  COMPUTER,
}

export enum Winner {
  PLAYER,
  COMPUTER,
  TIE,
}

export enum Row {
  A = 0,
  B = 1,
  C = 2,
}

export enum Column {
  A = 0,
  B = 1,
  C = 2,
}
