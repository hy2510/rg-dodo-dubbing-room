import { resLoading } from '@utils/Assets'
import styled from 'styled-components'

export default function Loading() {
  return (
    <StyledLoading>
      <img src={resLoading} alt="" draggable="false" />
    </StyledLoading>
  )
}

// ========== Styled Components ==========

const StyledLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 250px;
    height: 250px;
    display: block;
  }
`
