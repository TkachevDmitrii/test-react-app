import dayjs from 'dayjs'

export function formatDate (date: string): string {
  const dd = date.substring(8)
  const mm = date.substring(5, 7)
  const yyyy = date.substring(0, 4)

  return `${dd}.${mm}.${yyyy}`
}

export function formatTime(time: string) {
  const timeArr = time.split(':')

  const formattedTime = new Date()
  formattedTime.setHours(Number(timeArr[0]))
  formattedTime.setMinutes(Number(timeArr[1]))

  return dayjs(formattedTime)
}

export function formatDateForRequest(date: string) {
  return dayjs(date).format('MM.DD.YYYY')
}
