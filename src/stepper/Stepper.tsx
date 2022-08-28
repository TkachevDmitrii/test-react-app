import { StepperProvider } from './StepperContext'

interface StepperProps {
  count: number
  children: ReactNode
}

export function Stepper(props: StepperProps) {
  const { count, children } = props
  
  const [step, setStep] = useState(1)

  const finishStep = useCallback(() => {
    setStep(currentStep => {
      if (currentStep === count) return currentStep
      else return currentStep + 1
    })
  }, [count])

  const previousStep = useCallback(() => {
    setStep(currentStep => {
      if (currentStep === 1) return currentStep
      else return currentStep - 1
    })
  }, [])
  
  return (
    <StepperProvider {...{ currentStep: step, count, finishStep, previousStep }} >
      {children}
    </StepperProvider>
  )
}
