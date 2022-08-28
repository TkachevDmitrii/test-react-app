type Debounce = <T extends Function>(fn: T, delay: number) => (...args: any[]) => void

export const debounce: Debounce = (fn, delay) => {
  let timeoutId: ReturnType<typeof setTimeout>

  return function(...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
