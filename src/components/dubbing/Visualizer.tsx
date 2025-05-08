import { useEffect, useRef } from 'react'

type VisualizerProps = {
  audioFile: File | null
  color: string
}

export default function Visualizer({ audioFile, color }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!audioFile) return

    const setup = async () => {
      const audioContext = new AudioContext()
      const buffer = await audioFile.arrayBuffer()

      await audioContext.decodeAudioData(buffer).then((audioBuffer) => {
        drawGraph(getNormalizedData(getFilteredBuffer(audioBuffer)))
      })
    }

    setup()
  }, [audioFile])

  const getFilteredBuffer = (audioBuffer: AudioBuffer) => {
    const filteredData = []
    const rawData = audioBuffer.getChannelData(0)
    const samples = Math.floor(audioBuffer.duration * 10)
    const blockSize = Math.floor(rawData.length / samples)

    for (let i = 0; i < samples; i++) {
      let blockStart = blockSize * i
      let sum = 0

      if (i === 0) {
        for (let j = 0; j < blockSize; j++) {
          sum = sum + Math.abs(rawData[blockStart + j])
        }
      } else {
        for (let j = 0; j < blockSize; j++) {
          sum = sum + Math.abs(rawData[blockStart - j])
        }
      }

      filteredData.push(sum / blockSize)
    }

    return filteredData
  }

  const getNormalizedData = (filteredData: number[]) => {
    const peak = Math.max(...filteredData)
    const multiplier = Math.pow(peak, -1)
    const normalizedData = filteredData.map((n) => n * multiplier)

    return normalizedData
  }

  const drawGraph = (normalizedData: number[]) => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.scale(dpr, dpr)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 3
    ctx.strokeStyle = color
    ctx.beginPath()

    const sliceWidth = width / (normalizedData.length - 1)
    let x = 0

    for (let i = 0; i < normalizedData.length - 1; i++) {
      const v =
        normalizedData[i] > 0.5 ? normalizedData[i] * 0.97 : normalizedData[i]
      const vNext =
        normalizedData[i + 1] > 0.5
          ? normalizedData[i + 1] * 0.97
          : normalizedData[i + 1]
      const y = height * (1 - v)
      const yNext = height * (1 - vNext)

      const xNext = x + sliceWidth
      const xMid = (x + xNext) / 2
      const yMid = (y + yNext) / 2
      const cp1 = (x + xMid) / 2
      const cp2 = (xNext + xMid) / 2

      if (i === 0) {
        ctx.moveTo(x - 1, height)
        ctx.lineTo(x - 1, y)
      }

      ctx.quadraticCurveTo(cp1, y, xMid, yMid)
      ctx.quadraticCurveTo(cp2, yNext, xNext, yNext)
      x += sliceWidth
    }

    ctx.stroke()

    // 아래 영역을 채우고 싶다면 이 줄들 추가
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fillStyle = '#0b0b3b'
    ctx.fill()
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 8,
        display: 'block',
      }}
    />
  )
}
