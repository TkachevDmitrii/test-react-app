import { CheckOutlined } from '@ant-design/icons'
import { Button, palette } from '@my/ui-kit'
import { useField, inputSubscription } from 'form'

type KitButtonProps = Parameters<typeof Button>[0]

export interface ButtonProps
  extends Omit<KitButtonProps, 'value' | 'disabled' | 'children'>
{
  disabled: boolean
  name: string
}

const BottonWrapper = styled.div`
  display: flex;
  align-items: baseline;
`
const StyledButton = styled(Button)<{ value?: boolean, disabled?: boolean }>`
  color: ${({ disabled }) => disabled ? palette.DARK_BLUE_3 : palette.LIGHT_BLUE_2};
  padding: 0;
  font-weight: ${({ value }) => value ? '600' : '400'};
  width: auto;
  &:hover {
    color: ${({ disabled }) => disabled ? palette.DARK_BLUE_3 : palette.LIGHT_BLUE_2};
  }
`

function StudyMissingButton ({ name, disabled, ...props }: ButtonProps) {
  const { change, value } = useField<string>(name, { subscription: inputSubscription })
  const [state, setState] = useState<string>('')

  const handleClick = () => {
    let status = ''
    state  === '' ? setState('Absent') : setState('')
    state  === '' ? status = 'Absent' : status = ''

    change(status)
  }

  return (
    <BottonWrapper>
      {value ==='Absent' && <CheckOutlined style={{ color: palette.LIGHT_BLUE_2 }} />}
      <StyledButton 
        value={Boolean(value)}
        disabled={disabled}
        onClick={() => handleClick()}
        type='unbordered'
        {...props}
      >
        Исследование отсутствует
      </StyledButton>
    </BottonWrapper>
  )
}

const MemoStudyMissingButton = React.memo(StudyMissingButton)

export default MemoStudyMissingButton
