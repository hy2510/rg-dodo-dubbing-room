import styled from 'styled-components'

export function CorrectAction() {
  return (
    <StyledCorrectAction>
      <img
        src="src/assets/images/dubbing/res-sign_correct_rocket.svg"
        alt=""
        height={720}
      />
    </StyledCorrectAction>
  )
}

export function IncorrectAction() {
  return (
    <StyledIorrectAction>
      <img
        src="src/assets/images/dubbing/res-sign_incorrect_rocket.svg"
        alt=""
        height={720}
      />
    </StyledIorrectAction>
  )
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
