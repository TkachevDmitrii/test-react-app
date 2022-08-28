interface FieldContextValue {
  disabled?: boolean
  readOnly?: boolean
  markValid?: boolean
}

const FieldContext = React.createContext<FieldContextValue | undefined>(undefined)

type FieldContextProviderProps = FieldContextValue & { children?: ReactNode }

export function FieldContextProvider(props: FieldContextProviderProps) {
  const { disabled, readOnly, markValid, children } = props

  const fieldContext = useMemo<FieldContextValue>(
    () => ({ readOnly, disabled, markValid }),
    [disabled, readOnly, markValid]
  )

  return (
    <FieldContext.Provider value={fieldContext}>
      {children}
    </FieldContext.Provider>
  )
}

export function useFieldContext() {
  const ctx = useContext(FieldContext)
  if (ctx === undefined) throw new Error("[Form] The 'useFieldContext' hook must be used inside the 'Form' component")

  return ctx
}
