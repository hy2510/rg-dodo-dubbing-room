import { useEffect, useRef } from 'react'

interface Props {
  stream: MediaStream
  durationInSeconds: number
  color?: string
}

export default function LiveVisualizer({
  stream,
  durationInSeconds,
  color = '#ffffff',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>(0)
  const pointsRef = useRef<{ x: number; y: number }[]>([])
  const prevAmplitudeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    const audioCtx = new AudioContext()
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 4096

    const dataArray = new Uint8Array(analyser.fftSize)
    const source = audioCtx.createMediaStreamSource(stream)
    source.connect(analyser)

    const boostFactor = 15.0
    const smoothFactor = 0.7

    const draw = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now

      const elapsed = (now - startTimeRef.current) / 1000

      const progress = Math.min(elapsed / durationInSeconds, 1)
      const x = progress * width

      animationRef.current = requestAnimationFrame(draw)

      analyser.getByteTimeDomainData(dataArray)

      let sum = 0

      for (let i = 0; i < dataArray.length; i++) {
        const val = dataArray[i] / 128 - 1

        sum += val * val
      }

      const rawRms = Math.sqrt(sum / dataArray.length)
      const rms = rawRms < 0.01 ? 0 : rawRms
      const currentAmplitude = Math.min(1, rms * boostFactor)

      const prevAmplitude = prevAmplitudeRef.current
      const smoothedAmplitude =
        prevAmplitude * smoothFactor + currentAmplitude * (1 - smoothFactor)
      prevAmplitudeRef.current = smoothedAmplitude

      const y = height * (1 - smoothedAmplitude)

      if (
        pointsRef.current.length === 0 ||
        x > pointsRef.current[pointsRef.current.length - 1].x
      ) {
        pointsRef.current.push({ x, y })
      }

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#0b0b3b'
      ctx.fillRect(0, 0, width, height)

      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = color

      const points = pointsRef.current

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i]
        const p1 = points[i + 1]
        const cx = (p0.x + p1.x) / 2
        const cy = (p0.y + p1.y) / 2

        if (i === 0) ctx.moveTo(p0.x, p0.y)

        ctx.quadraticCurveTo(p0.x, p0.y, cx, cy)
      }

      ctx.stroke()
    }

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationRef.current!)
      source.disconnect()
      analyser.disconnect()
      audioCtx.close()
    }
  }, [stream, durationInSeconds, color])

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
