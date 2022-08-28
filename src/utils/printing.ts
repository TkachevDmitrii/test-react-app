const replaceValue =
  '$1' + ' (' + '$2' + ') ' + '$3' + ' ' + '$4' + ' ' + '$5'

const PHONE_REG_EXP = /(\+7)([0-9]{3})([0-9]{3})([0-9]{2})([0-9]{2})/g

export function printMoney(amount: number): string {
  return amount.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  })
}
  
export function printDate(date: Date) {
  return date.toLocaleDateString('ru')
}

export function printTime(date: Date) {
  return date.toLocaleTimeString('ru', { hour: '2-digit', minute:'2-digit' })
}

export function printFullDate(date: Date) {
  return date.toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function printPhone(phone: string) {
  return phone.replace(
    PHONE_REG_EXP,
    replaceValue,
  )
}
