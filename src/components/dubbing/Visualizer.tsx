import { useEffect, useRef } from 'react'

interface Props {
  audioFile: File | null
  color?: string
}

export default function Visualizer({ audioFile, color = '#ffffff' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!audioFile) return
    ;(async () => {
      // --- 1) 오디오 디코딩
      const arrayBuffer = await audioFile.arrayBuffer()
      const audioCtx = new AudioContext()
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
      const rawData = audioBuffer.getChannelData(0) // mono 데이터

      // --- 2) 캔버스 준비
      const canvas = canvasRef.current!
      const ctx = canvas.getContext('2d')!
      const dpr = window.devicePixelRatio || 1
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, height)

      // --- 3) 블록별 RMS 진폭 계산
      const blockSize = Math.floor(rawData.length / width)
      const amps: number[] = new Array(width)

      for (let i = 0; i < width; i++) {
        let sumSq = 0
        const offset = i * blockSize
        for (let j = 0; j < blockSize; j++) {
          const v = rawData[offset + j] || 0
          sumSq += v * v
        }
        amps[i] = Math.sqrt(sumSq / blockSize)
      }

      // --- 4) 정규화
      const peak = Math.max(...amps)
      const norm = amps.map((a) => a / (peak || 1))

      // --- 5) 넓은 이동 평균(windowSize)으로 부드럽게
      const windowSize = 15 // ← 이 값을 키우면 정상부가 더 플랫해집니다
      const smooth: number[] = new Array(width)

      for (let i = 0; i < width; i++) {
        let sum = 0,
          count = 0

        for (let dx = -windowSize; dx <= windowSize; dx++) {
          const idx = i + dx

          if (idx >= 0 && idx < width) {
            sum += norm[idx]
            count++
          }
        }

        smooth[i] = sum / count
      }

      // --- 6) 화면에 매끄러운 곡선으로 그리기
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = color

      for (let i = 0; i < width; i++) {
        const x = i
        const y = height * (1 - smooth[i])

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          // 이전 점과의 중간 제어점으로 quadratic curve
          const px = x - 1
          const py = height * (1 - smooth[i - 1])
          const cx = (px + x) / 2
          const cy = (py + y) / 2
          ctx.quadraticCurveTo(px, py, cx, cy)
        }
      }

      ctx.stroke()
      audioCtx.close()
    })()
  }, [audioFile, color])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 8,
      }}
    />
  )
}
