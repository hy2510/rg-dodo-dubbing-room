/**
 * 문자열을 시간으로 컨버팅
 * @param timeStr
 * @returns
 */
const convertTimeToSec = (timeStr: string) => {
  const [min, sec] = timeStr.split(':')
  return parseFloat(min) * 60 + parseFloat(sec)
}

/**
 * 시간을 문자열로 포맷
 * @param seconds
 * @returns
 */
const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return [
    hours.toString().padStart(2, '0'),
    mins.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0'),
  ].join(':')
}

export { convertTimeToSec, formatTime }
