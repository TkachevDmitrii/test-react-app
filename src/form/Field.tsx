import { useFieldName, NameProvider } from './NameContext'
import { useForm, FieldValidator, createFieldValidator } from './'

interface FieldProps<FieldValue> {
  name: string
  validate?: FieldValidator<FieldValue>
  children: ReactNode
}

function Field<Value>({ name, validate, children }: FieldProps<Value>) {

  const currentName = useFieldName(name)
  const form = useForm()
  useEffect(() => {
    const validator = createFieldValidator(validate)
    const fieldConfig = { getValidator: () => validator }
    const unsubscribe = form.registerField(currentName, () => {}, {}, fieldConfig)

    return unsubscribe
  }, [currentName])

  const handleBlur = useCallback(() => {
    const field = form.getFieldState(currentName)
    field?.blur()
  }, [currentName])

  return (
    <NameProvider value={currentName}>
      <span style={{ display: 'contents' }} onBlur={handleBlur}>
        {children}
      </span>
    </NameProvider>
  )
}

export default Field
