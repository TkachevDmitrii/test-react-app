import { useStepper } from './StepperContext'

type StepProps<Component extends React.ElementType>
  = GenericComponentProps<Component>
  & {
    order: number
  }

export function Step<Component extends React.ElementType>(props: StepProps<Component>) {
  const { order, component, ...componentProps } = props

  if (order < 1) throw new Error(`[Stepper] The 'order' property must be greater than '1' but got: ${order}`)

  const { currentStep } = useStepper()

  if (currentStep !== order) return null

  const Component = component ?? React.Fragment
  return (
    //@ts-ignore
    <Component {...componentProps} />
  )
}
