import styled from 'styled-components'
import { Stepper } from '@my/ui-kit'
import { useStepper } from 'stepper'
import { PrevStepButton, FinishStepButton } from './'

interface IStepsProps {
  disableInvalid?: boolean
  disableInvalidStepList?: number[]
}

const StepperWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  padding-bottom: 10px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  padding-top: 20px;

  @media screen and (max-width: 632px) {
    display: none;
  }
`

function Steps({ disableInvalid, disableInvalidStepList }: IStepsProps) {

  const { currentStep, count } = useStepper()
  const disableInvalidBtn = disableInvalid && disableInvalidStepList?.includes(currentStep)

  return (
    <div>
      <ButtonContainer>
        <div><PrevStepButton /></div>
        <div><FinishStepButton disableInvalid={disableInvalidBtn} /></div>
      </ButtonContainer>
      <StepperWrapper>
        <Stepper currentStep={currentStep} steps={count} />
      </StepperWrapper>
    </div>
  )
}

const MemoSteps = React.memo(Steps) as typeof Steps

export default MemoSteps
