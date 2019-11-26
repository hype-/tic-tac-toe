import { Maybe, State } from './types'

const STATE_KEY = 'state'

export function persistState(state: State): void {
  localStorage.setItem(STATE_KEY, JSON.stringify(state))
}

export function withPersistState(state: State): State {
  persistState(state)

  return state
}

export function readState(): Maybe<State> {
  const state = localStorage.getItem(STATE_KEY)

  if (state) {
    return JSON.parse(state)
  }

  return null
}
