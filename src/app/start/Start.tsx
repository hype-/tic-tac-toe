import React from 'react'

import { PlayerForm } from './PlayerForm'
import { Character } from '../types'

interface Props {
  onSubmit: (name: string, character: Character) => void
}

export function Start({ onSubmit }: Props): JSX.Element {
  return (
    <>
      <h2>Start the game by filling in your name and character</h2>

      <PlayerForm onSubmit={onSubmit} />
    </>
  )
}
