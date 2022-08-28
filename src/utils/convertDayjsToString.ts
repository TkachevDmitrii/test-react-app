import { Dayjs } from 'dayjs'

export const convertDayjsToString = (value: Dayjs | Dayjs[] | null) => {
  if (!value) return 

  if (!Array.isArray(value)) {
    value.toString = () => {
      const date = value.toDate()
      const year = date.getFullYear()
      const month = date.getMonth()
      const dayNum = date.getDate()
      const utcFormatDateStr = Date.UTC(year, month, dayNum)
      const newDate = new Date(utcFormatDateStr)
    
      return newDate.toISOString()
    }
  
    value.toJSON = () => {
      const date = value.toDate()
      const year = date.getFullYear()
      const month = date.getMonth()
      const dayNum = date.getDate()
      const utcFormatDateStr = Date.UTC(year, month, dayNum)
      const newDate = new Date(utcFormatDateStr)
  
      return newDate.toISOString()
    }
  } else {
    convertDayjsToString(value[0])
    convertDayjsToString(value[1])
  }
}
