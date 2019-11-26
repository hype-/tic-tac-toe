import React from 'react'
import styled from 'styled-components'

import { Maybe, Character } from '../../types'

interface Props {
  character: Maybe<Character>
  isCompleted: boolean
  onClick: () => void
}

export function Space({ character, isCompleted, onClick }: Props): JSX.Element {
  return (
    <Container onClick={onClick} disabled={isCompleted || character != null}>
      {character}
    </Container>
  )
}

interface ContainerProps {
  disabled: boolean
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
  color: #1f0812;
  font-size: 4rem;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`
