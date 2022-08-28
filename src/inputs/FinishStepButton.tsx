import styled from 'styled-components'
import { Button, Icon } from '@my/ui-kit'
import { useStepper } from 'stepper'
import { useForm, useFormState, useFieldContext, FormSubscription } from 'form'

type FinishStepButtonProps<Component extends React.ElementType>
  = Omit<GenericComponentProps<Component>, 'children'>
  & {
    disabled?: boolean
    disableInvalid?: boolean
    component?: Component
    nextStepLabel?: string
    lastStepLabel?: string
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

const ArrowWrapper = styled.div`
  margin-left: 12px;
`

const Content = styled.div`
  display: flex;
  align-items: flex-end;
`

function FinishStepButton<Component extends React.ElementType = typeof Button>({
  disabled,
  disableInvalid,
  nextStepLabel = 'Продолжить',
  lastStepLabel = 'Продолжить',
  ...props
}: FinishStepButtonProps<Component>) {

  const { component, ...derivedProps } = {
    children: nextStepLabel, lastStepLabel,
    ...props,
  } as FinishStepButtonProps<Component>

  const form = useForm()
  const { currentStep, count, finishStep } = useStepper()

  const formProps = useFieldContext()

  const {
    hasValidationErrors, submitFailed, dirtySinceLastSubmit, pristine,
    submitting, validating, touched = {}
  } = useFormState(subscription)

  if (formProps.readOnly) return null

  disabled = formProps.disabled || disabled || submitting || validating ||
    (hasValidationErrors && (
      (submitFailed || dirtySinceLastSubmit || Object.values(touched).every(t => t))
      || disableInvalid
    ))

  const isLastStep = currentStep === count
  const handleClick = isLastStep || hasValidationErrors ? form.submit : finishStep

  const Component = component ?? Button
  return (
    //@ts-ignore
    <Component {...derivedProps} disabled={disabled} onClick={handleClick}>
      <Content>
        {isLastStep ? lastStepLabel : nextStepLabel}
        <ArrowWrapper>
          <Icon type='arrow' />
        </ArrowWrapper>
      </Content>
    </Component>
  )
}

const MemoFinishStepButton = React.memo(FinishStepButton) as typeof FinishStepButton

export default MemoFinishStepButton
