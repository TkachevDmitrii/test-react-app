import { Button } from '@my/ui-kit'
import { useForm, useFormState, useFieldContext, FormSubscription } from 'form'

type SubmitButtonProps<Component extends React.ElementType>
  = Omit<GenericComponentProps<Component>, 'children'>
  & {
    disablePristine?: boolean
    disabled?: boolean
    component?: Component
    label?: string
  }

const subscription: FormSubscription = {
  hasValidationErrors: true,
  submitFailed: true,
  dirtySinceLastSubmit: true,
  pristine: true,
  submitting: true,
  validating: true,
  touched: true,
}

function SubmitButton<Component extends React.ElementType = typeof Button>({
  disablePristine = false,
  disabled,
  label = 'Сохранить',
  ...props
}: SubmitButtonProps<Component>) {

  const { component, ...derivedProps } = {
    children: label,
    ...props,
  } as SubmitButtonProps<Component>

  const form = useForm()

  const formProps = useFieldContext()

  const {
    hasValidationErrors, submitFailed, dirtySinceLastSubmit, pristine,
    submitting, validating, touched = {}
  } = useFormState(subscription)

  if (formProps.readOnly) return null

  disabled = formProps.disabled || disabled || submitting || validating ||
    (hasValidationErrors && (submitFailed || dirtySinceLastSubmit || Object.values(touched).every(t => t)))
    || (disablePristine && pristine)

  const Component = component ?? Button
  return (
    <Component {...derivedProps} disabled={disabled} onClick={form.submit}>
      {label}
    </Component>
  )
}

const MemoSubmitButton = React.memo(SubmitButton) as typeof SubmitButton

export default MemoSubmitButton
