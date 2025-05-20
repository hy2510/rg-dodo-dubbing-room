import styled from 'styled-components'

import { resSignCorrectRocket, resSignIncorrectRocket } from '@utils/Assets'

type CorrectionResultProps = {
  isCorrect: boolean
}

function CorrectAction() {
  return (
    <StyledCorrectAction>
      <img src={resSignCorrectRocket} alt="" height={720} />
    </StyledCorrectAction>
  )
}

function IncorrectAction() {
  return (
    <StyledIorrectAction>
      <img src={resSignIncorrectRocket} alt="" height={720} />
    </StyledIorrectAction>
  )
}

export default function CorrectionResult({ isCorrect }: CorrectionResultProps) {
  return isCorrect ? <CorrectAction /> : <IncorrectAction />
}

// ========== Styled Components ==========

const StyledCorrectAction = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: end;
  justify-content: end;
`

const StyledIorrectAction = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: end;
  justify-content: end;
`
