import React, { useRef } from 'react'
import styled from 'styled-components'

const COLORS = ['#FFD700', '#FFC107', '#FFA500', '#FFECB3']
const SHAPES = [
  `<polygon points="21,0,28.05,11.29,40.97,14.51,32.41,24.71,33.34,37.99,21,33,8.66,37.99,9.59,24.71,1.03,14.51,13.95,11.29" />`,
  `<polygon points="18,0,22.24,13.76,36,18,22.24,22.24,18,36,13.76,22.24,0,18,13.76,13.76" />`,
  `<polygon points="18,0,27.19,8.81,36,18,27.19,27.19,18,36,8.81,27.19,0,18,8.81,8.81" />`,
]

type BtnBoomProps = {
  bgColor?: string
  color?: string
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function BtnBoom({
  bgColor = 'transparent',
  color = '#000',
  children,
  onClick,
  className,
}: BtnBoomProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const createBoomParticles = () => {
    const container = containerRef.current
    if (!container) return

    const particles: Particle[] = []
    const numParticles = 100

    for (let i = 0; i < numParticles; i++) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
      const scale = Math.floor(Math.random() * 5) + 4
      const offsetX = Math.floor(Math.random() * 250) - 100
      const offsetY = Math.floor(Math.random() * 250) - 100
      const duration = Math.floor(Math.random() * 1700) + 1000

      const particle = document.createElement('div')
      particle.className = 'boom-shape'
      particle.innerHTML = `<svg viewBox="0 0 40 40" fill="${color}">${shape}</svg>`

      Object.assign(particle.style, {
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) scale(0.${scale})`,
        transformOrigin: 'center',
        position: 'absolute',
        transition: `${duration}ms`,
        zIndex: '100',
      })

      container.appendChild(particle)
      particles.push({ element: particle, x: offsetX, y: offsetY })
    }

    requestAnimationFrame(() => {
      particles.forEach(({ element, x, y }) => {
        element.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`
      })
    })

    setTimeout(() => {
      particles.forEach(({ element }) => element.remove())
    }, 2000)
  }

  const handleButtonClick = () => {
    createBoomParticles()
    onClick?.()
  }

  return (
    <StyledBtnBoom ref={containerRef} className={className}>
      <button
        style={{ backgroundColor: bgColor, color }}
        onClick={handleButtonClick}
      >
        {children}
      </button>
    </StyledBtnBoom>
  )
}

type Particle = {
  element: HTMLDivElement
  x: number
  y: number
}

// ========== Styled Components ==========

const StyledBtnBoom = styled.div`
  position: relative;
  display: inline-block;

  button {
    padding: 2px 4px;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
    font: inherit;
  }

  .boom-shape {
    width: 40px;
    height: 40px;
    pointer-events: none;
    position: absolute;
    transform: translate(-50%, -50%);
  }

  svg {
    width: 100%;
    height: 100%;
  }
`
