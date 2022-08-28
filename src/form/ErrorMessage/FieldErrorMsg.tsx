import { palette } from '@my/ui-kit'
import { FieldState } from 'final-form'
import { useForm, errorSubscription, shouldDisplayFieldError, getCurrentFieldState } from '..'

type FieldErrorMsgProps<Component extends React.ElementType>
  = GenericComponentProps<Component>
  & { name: string }

export function FieldErrorMsg<
  Component extends React.ElementType = 'div'
>({ name, component, ...props }: FieldErrorMsgProps<Component>) {

  const form = useForm()

  const [fieldState, setFieldState] = useState<FieldState<any>>()

  useEffect(() => {
    const unsubscribe = form.registerField(name, setFieldState, errorSubscription)

    return unsubscribe
  }, [name])

  const finalState = fieldState ?? getCurrentFieldState(form, name)

  const displayError = shouldDisplayFieldError(finalState)
  const { error, submitError } = finalState

  if (!displayError) return null

  const Component = component ?? 'div'

  return (
    <Component {...props} style={{ color: palette.RED, fontSize: '12px', fontWeight: 500, marginBottom: '12px' }}>
      {error || submitError}
    </Component>
  )
}
