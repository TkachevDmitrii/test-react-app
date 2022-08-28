import { FieldState, FieldSubscription } from 'final-form'
import shallowEqual from 'utils/shallowEqual'
import { useMutableState } from 'hooks'
import { useFieldName } from './NameContext'
import { useForm, getCurrentFieldState, createFieldValidator, fieldSubscription, FieldValidator } from './'

interface UseFieldConfig<Value> {
  subscription?: FieldSubscription
  validate?: FieldValidator<Value>
}

interface UseFieldMutableState<Value> {
  change: (value: Value | ((currentValue: Value) => Value)) => void
  blur: () => void
  focus: () => void
  name: string
}

function isEqual(value1: any, value2: any) {
  if (
    (value1 == null || value1 === '')
     && (value2 == null || value2 === '')
  ) return true

  return shallowEqual(value1, value2)
}

type UseFieldProps<Value> = Omit<FieldState<Value>, 'change' | 'blur'> & Omit<UseFieldMutableState<Value>, 'name'>

export function useField<Value>(name: string | undefined, config?: UseFieldConfig<Value>) {
  const { subscription, validate } = config ?? {}

  const currentName = useFieldName(name)
  const form = useForm()

  const [fieldState, setFieldState] = useState<FieldState<Value>>()

  useEffect(() => {

    const registeredFields = form.getRegisteredFields()
    const validateFields = [
      ...currentName.matchAll(/(\.)|(\[)|(!]\.)|(!]\[)/g)
    ].map(({ index }) => currentName.slice(0, index))
      .filter(f => registeredFields.includes(f))

    const validator = createFieldValidator(validate)

    const fieldConfig = { isEqual, validateFields, getValidator: () => validator }
    const unsubscribe = form.registerField(currentName, setFieldState, subscription ?? fieldSubscription, fieldConfig)

    return unsubscribe

  }, [currentName, subscription, validate])

  const current = useMutableState<UseFieldMutableState<Value>>()
  if (current.change === undefined) {
    current.change = value => {
      if (value instanceof Function) {
        const currentState = getCurrentFieldState<Value>(form, current.name)
        const nextValue = value(currentState.value as Value)
        form.change(current.name, nextValue)

      } else form.change(current.name, value)
    }
    current.blur = () => form.blur(current.name)
    current.focus = () => form.focus(current.name)
  }
  current.name = currentName

  const finalState = fieldState ?? getCurrentFieldState<Value>(form, currentName)
  const { change, blur } = current

  return {
    ...finalState,
    length: finalState?.length ?? (finalState.value as unknown as any[])?.length,
    change,
    blur,
    name: current.name,
  } as UseFieldProps<Value>
}
