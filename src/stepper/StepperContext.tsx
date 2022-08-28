interface StepperApi {
  currentStep: number
  count: number
  finishStep: () => void
  previousStep: () => void
}

const StepperContext = React.createContext<StepperApi | undefined>(undefined)

interface StepperProviderProps extends StepperApi {
  children?: ReactNode
}

export function StepperProvider(props: StepperProviderProps) {
  const { currentStep, count, finishStep, previousStep, children } = props

  const stepper = useMemo(
    () => ({ currentStep, count, finishStep, previousStep }),
    [currentStep, count]
  )

  return (
    <StepperContext.Provider value={stepper}>
      {children}
    </StepperContext.Provider>
  )
}

export function useStepper() {
  const stepper = useContext(StepperContext)

  if (stepper === undefined)
    throw new Error("[Stepper] The 'useStepper' hook must be used inside the 'Stepper' component")

  return stepper
}
