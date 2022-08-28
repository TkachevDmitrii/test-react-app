import styled from 'styled-components'
import { RadioButton as KitRadio } from '@my/ui-kit'
import { useField, inputSubscription } from 'form'
import { Label } from 'ui'
import { useDerivedFieldProps } from './useDerivedFieldProps'

type KitRadioProps = Parameters<typeof KitRadio>[0]

export interface RadioProps
  extends Omit<KitRadioProps, 'onChange' | 'checked' | 'onBlur' | 'value'>
{
  readOnly?: boolean
  onChange?: (checked: boolean) => void
  label?: string | undefined
  value: any
}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 20px;
  > p {
    font-size: 14px;
  }
  .ant-radio-wrapper {
    margin-right: 8px;
  }
`

function Radio({ name, value: option, label, onChange, ...props }: RadioProps) {

  const { markValid, className, ...derivedProps } = useDerivedFieldProps(props)

  const { value, change, blur } = useField<boolean>(name, { subscription: inputSubscription })

  const handleChange = useCallback(() => {
    change(option)
    onChange?.(true)
  }, [onChange, option])

  const inputProps = {
    checked: value === option,
    onBlur: blur,
    onChange: handleChange,
  }
  
  return (
    <Root>
      <KitRadio {...derivedProps} {...inputProps} />
      {label && <Label>{label}</Label>}
    </Root>
  )
}

const MemoRadio = React.memo(Radio) as typeof Radio

export default MemoRadio
