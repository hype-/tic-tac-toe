import React, { useCallback, useState, ChangeEvent } from 'react'
import styled from 'styled-components'

import { Character } from '../types'

interface Props {
  onSubmit: (name: string, character: Character) => void
}

type Errors = { [key: string]: string }

export function PlayerForm({ onSubmit }: Props): JSX.Element {
  const [draftName, setDraftName] = useState('')
  const [draftCharacter, setDraftCharacter] = useState('')
  const [errors, setErrors] = useState<Errors>({})

  const handleChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDraftName(event.target.value)
  }, [])

  const handleChangeCharacter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDraftCharacter(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()

      const errors = validate(draftName, draftCharacter)

      setErrors(errors)

      if (Object.values(errors).length === 0 && isValidCharacter(draftCharacter)) {
        onSubmit(draftName, draftCharacter)
      }
    },
    [draftName, draftCharacter, onSubmit],
  )

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <Label>
          Name:
          <Input type="text" name="name" value={draftName} onChange={handleChangeName} />
        </Label>

        {errors.name && <Error>{errors.name}</Error>}
      </InputContainer>

      <InputContainer>
        <Label>Character:</Label>

        <RadioContainer>
          <Input
            type="radio"
            name="character"
            id="character-x"
            value={Character.X}
            onChange={handleChangeCharacter}
          />

          <RadioLabel htmlFor="character-x">X</RadioLabel>
        </RadioContainer>

        <RadioContainer>
          <Input
            type="radio"
            name="character"
            id="character-o"
            value={Character.O}
            onChange={handleChangeCharacter}
          />

          <RadioLabel htmlFor="character-o">O</RadioLabel>
        </RadioContainer>

        {errors.character && <Error>{errors.character}</Error>}
      </InputContainer>

      <InputContainer>
        <Input type="submit" value="Submit" />
      </InputContainer>
    </form>
  )
}

function validate(name: string, character: string): Errors {
  const errors: Errors = {}

  if (name.length < 1) {
    errors.name = 'Name needs to be at least 3 characters'
  }

  if (!isValidCharacter(character)) {
    errors.character = 'A character needs to be selected'
  }

  return errors
}

function isValidCharacter(value: string): value is Character {
  return Object.keys(Character).includes(value)
}

const InputContainer = styled.div`
  & + & {
    margin-top: 1rem;
  }
`

const RadioContainer = styled.div``

const Input = styled.input`
  padding: 0.5rem;
  background: #fcfcfc;
  border: 1px solid #5d576b;
  border-radius: 5px;
`

const Error = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #e4959e;
  color: #1f0812;
`

const Label = styled.label`
  ${Input} {
    margin-left: 1rem;
  }
`

const RadioLabel = styled.label`
  margin-left: 0.5rem;
`
