import { State, EMPTY_BOARD, Turn, Player, Character, Board, Winner } from './types'
import { readState, withPersistState } from './storage'

export const initialState: State = {
  player: null,
  board: EMPTY_BOARD,
  turn: Turn.PLAYER,
  winner: null,
}

export function initialize(state: State): State {
  const storageState = readState()

  return storageState || state
}

const RESET_GAME = 'RESET_GAME'
const RESET_BOARD = 'RESET_BOARD'
const SET_PLAYER = 'SET_PLAYER'
const SET_BOARD = 'SET_BOARD'
const SET_TURN = 'SET_TURN'
const SET_WINNER = 'SET_WINNER'

interface ResetGameAction
  extends Readonly<{
    type: typeof RESET_GAME
  }> {}

export function resetGameAction(): ResetGameAction {
  return {
    type: RESET_GAME,
  }
}

interface ResetBoardAction
  extends Readonly<{
    type: typeof RESET_BOARD
  }> {}

export function resetBoardAction(): ResetBoardAction {
  return {
    type: RESET_BOARD,
  }
}

interface SetPlayerAction
  extends Readonly<{
    type: typeof SET_PLAYER
    payload: {
      player: Player
    }
  }> {}

export function setPlayerAction(name: string, character: Character): SetPlayerAction {
  return {
    type: SET_PLAYER,
    payload: {
      player: {
        name,
        character,
      },
    },
  }
}

interface SetBoardAction
  extends Readonly<{
    type: typeof SET_BOARD
    payload: {
      board: Board
    }
  }> {}

export function setBoardAction(board: Board): SetBoardAction {
  return {
    type: SET_BOARD,
    payload: {
      board,
    },
  }
}

interface SetTurnAction
  extends Readonly<{
    type: typeof SET_TURN
    payload: {
      turn: Turn
    }
  }> {}

export function setTurnAction(turn: Turn): SetTurnAction {
  return {
    type: SET_TURN,
    payload: {
      turn,
    },
  }
}

interface SetWinnerAction
  extends Readonly<{
    type: typeof SET_WINNER
    payload: {
      winner: Winner
    }
  }> {}

export function setWinnerAction(winner: Winner): SetWinnerAction {
  return {
    type: SET_WINNER,
    payload: {
      winner,
    },
  }
}

type Action =
  | ResetGameAction
  | ResetBoardAction
  | SetPlayerAction
  | SetBoardAction
  | SetTurnAction
  | SetWinnerAction

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case RESET_GAME:
      return withPersistState(initialState)

    case RESET_BOARD:
      return withPersistState({
        ...state,
        board: EMPTY_BOARD,
        turn: initialState.turn,
        winner: initialState.winner,
      })

    case SET_PLAYER:
      return withPersistState({
        ...state,
        player: action.payload.player,
      })

    case SET_BOARD:
      return withPersistState({
        ...state,
        board: action.payload.board,
      })

    case SET_TURN:
      return withPersistState({
        ...state,
        turn: action.payload.turn,
      })

    case SET_WINNER:
      return withPersistState({
        ...state,
        winner: action.payload.winner,
      })

    default:
      throw new Error('Invalid reducer action')
  }
}
