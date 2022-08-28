import styled from 'styled-components'
import { Button, Icon } from '@my/ui-kit'
import { useFormState, useFieldContext, FormSubscription } from 'form'
import { useStepper } from 'stepper'

type PrevStepButtonProps<Component extends React.ElementType>
  = Omit<GenericComponentProps<Component>, 'children'>
  & {
    disabled?: boolean
    component?: Component
    label?: string
  }

const subscription: FormSubscription = {
  submitting: true,
}

const ArrowWrapper = styled.div`
  transform: rotate(180deg);
  margin-right: 12px;
`

const Content = styled.div`
  display: flex;
  align-items: flex-start;
`

function PrevStepButton<Component extends React.ElementType = typeof Button>({
  disabled,
  label = 'Назад',
  ...props
}: PrevStepButtonProps<Component>) {

  const { component, ...derivedProps } = {
    children: label,
    ...props,
  } as PrevStepButtonProps<Component>

  const { currentStep, previousStep } = useStepper()

  const formProps = useFieldContext()

  const { submitting } = useFormState(subscription)

  if (formProps.readOnly || currentStep === 1) return null

  disabled = formProps.disabled || disabled || submitting

  const Component = component ?? Button
  return (
    <Component {...derivedProps} disabled={disabled} onClick={previousStep}>
      <Content>
        <ArrowWrapper>
          <Icon type='arrow' />
        </ArrowWrapper>
        {label}
      </Content>
    </Component>
  )
}

const MemoPrevStepButton = React.memo(PrevStepButton) as typeof PrevStepButton

export default MemoPrevStepButton
