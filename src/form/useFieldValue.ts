import { FieldState, FieldSubscription } from 'final-form'
import { useFieldName } from './NameContext'
import { useForm, getCurrentFieldState } from './'

const valueSubscription: FieldSubscription = {
  value: true,
  initial: true,
  dirty: true,
  modified: true,
  error: true,
  validating: true,
}

export function useFieldValue<Value>(name: string) {

  const currentName = useFieldName(name)
  const form = useForm()

  const [fieldState, setFieldState] = useState<FieldState<Value>>()

  useEffect(() => {
    const unsubscribe = form.registerField(currentName, setFieldState, valueSubscription)

    return unsubscribe
  }, [currentName])

  const finalState = fieldState ?? getCurrentFieldState(form, currentName)

  return finalState
}
