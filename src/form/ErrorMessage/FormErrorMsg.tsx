import { palette } from '@my/ui-kit'
import { FormSubscription } from 'final-form'
import { useFormState } from '..'

const formErrorSubscription: FormSubscription = {
  error: true,
  submitError: true,
  submitFailed: true
}

type FormErrorMsgProps<Component extends React.ElementType> =
  GenericComponentProps<Component>

export function FormErrorMsg<
  Component extends React.ElementType = 'div'
>({ component, ...props }: FormErrorMsgProps<Component>) {

  const { error, submitError, submitFailed } = useFormState(formErrorSubscription)

  const displayError = (Boolean(error) && typeof error === 'string' && submitFailed)
  || (Boolean(submitError) && typeof submitError === 'string')

  if (!displayError) return null

  const Component = component ?? 'div'

  return (
    //@ts-ignore
    <Component {...props} style={{ color: palette.RED, fontSize: '12px', fontWeight: 500 }}>
      {error || submitError}
    </Component>
  )
}
