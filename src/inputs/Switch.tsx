import styled from 'styled-components'
//  не меняйте импорт на ui-kit, он там работает не правильно, с первого раза не включается
import { Switch as KitSwitch } from 'antd'
import { palette } from '@my/ui-kit'
import { useField, inputSubscription } from 'form'
import { Label } from 'ui'
import { toggleValueInArray } from './toggleValueInArray'
import { useDerivedFieldProps } from './useDerivedFieldProps'

type KitSwitchProps = Parameters<typeof KitSwitch>[0]

type ChangeHandler = NonNullable<KitSwitchProps['onChange']>

export interface SwitchProps
  extends Omit<KitSwitchProps, 'onChange' | 'checked' | 'onBlur'>
{
  readOnly?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  name?: string
  value?: unknown
}

const Root = styled.div`
  display: inline-flex;
  padding-bottom: 8px;
  > p {
    font-size: 14px;
    margin-right: 8px;
  }
`

const StyledSwitch = styled(KitSwitch)`
  &.ant-switch-checked {
    background-color: ${palette.BLUE};
  }
`

function Switch({ name, value: option, label, onChange, ...props }: SwitchProps) {

  const { markValid, className, ...derivedProps } = useDerivedFieldProps(props)

  const { value, change, blur } = useField<boolean | unknown[]>(name, { subscription: inputSubscription })

  const handleChange = useCallback<ChangeHandler>(
    checked => {
      if (option !== undefined) {
        change(selectedOptions => toggleValueInArray(selectedOptions as unknown[], option))
      } else change(checked)
      onChange?.(checked)
    
    }, [option, onChange])

  const checked = value instanceof Array
    ? value.includes(option)
    : value

  const inputProps = {
    checked: checked ?? false,
    onBlur: blur,
    onChange: handleChange,
  }

  return (
    <Root>
      {label && <Label>{label}</Label>}
      <StyledSwitch {...derivedProps} {...inputProps} />
    </Root>
  )
}

const MemoSwitch = React.memo(Switch) as typeof Switch

export default MemoSwitch
