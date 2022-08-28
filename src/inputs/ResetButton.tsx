import { Button } from '@my/ui-kit'
import { useForm, useFormState, useFieldContext, FormSubscription } from 'form'

type ResetButtonProps<Component extends React.ElementType>
  = Omit<GenericComponentProps<Component>, 'children'>
  & {
    disabled?: boolean
    component?: Component
    label?: string
  }

const subscription: FormSubscription = {
  pristine: true,
  submitting: true,
}

function ResetButton<Component extends React.ElementType = typeof Button>({
  disabled,
  label = 'Очистить',
  ...props
}: ResetButtonProps<Component>) {

  const { component, ...derivedProps } = {
    children: label,
    ...props,
  } as ResetButtonProps<Component>

  const formProps = useFieldContext()

  const { pristine, submitting } = useFormState(subscription)
  const form = useForm()

  if (formProps.readOnly) return null

  disabled = formProps.disabled || disabled || submitting || pristine

  const Component = component ?? Button
  return (
    //@ts-ignore
    <Component {...derivedProps} disabled={disabled} onClick={() => form.reset()}>
      {label}
    </Component>
  )
}

export default React.memo(ResetButton) as typeof ResetButton
