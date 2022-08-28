export function useMutableState<T extends Object = Record<string, any>>(initialize?: () => T) {
  const mutableState = useRef<T>(initialize?.() ?? Object()).current
  return mutableState
}
