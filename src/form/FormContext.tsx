import { FormApi } from 'final-form'

const FormContext = React.createContext<FormApi<any, any> | undefined>(undefined)

interface FormProviderProps {
  form: FormApi<any, any>
  children?: ReactNode
}

export function FormProvider({ form, children }: FormProviderProps) {
  return (
    <FormContext.Provider value={form}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm<
  Values extends Record<string, any> = Record<string, any>,
  InitialValues extends Partial<Values> = Partial<Values>
>() {
  const form = useContext<FormApi<Values, InitialValues> | undefined>(FormContext)
  if (form === undefined) throw new Error("[Form] The 'useForm' hook must be used inside the 'Form' component")

  return form
}
