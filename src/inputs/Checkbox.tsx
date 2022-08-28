import styled from 'styled-components'
import { Checkbox as KitCheckbox } from '@my/ui-kit'
import { useField, inputSubscription } from 'form'
import { Label } from 'ui'
import { toggleValueInArray } from './toggleValueInArray'
import { useDerivedFieldProps } from './useDerivedFieldProps'

type KitCheckboxProps = Parameters<typeof KitCheckbox>[0]

type ChangeHandler = NonNullable<KitCheckboxProps['onChange']>

export interface CheckboxProps
  extends Omit<KitCheckboxProps, 'onChange' | 'checked' | 'onBlur' | 'value'>
{
  readOnly?: boolean
  onChange?: (checked: boolean) => void
  label?: string | ReactNode | undefined
  value?: unknown
}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 24px;
  > p {
    font-size: 14px;
  }
  .ant-checkbox-wrapper {
    margin-right: 8px;
  }
`

function Checkbox({ name, value: option, label, onChange, style, ...props }: CheckboxProps) {

  const { markValid, className, ...derivedProps } = useDerivedFieldProps(props)

  const { value, change, blur } = useField<boolean | unknown[]>(name, { subscription: inputSubscription })

  const checkAllVariant = Array.isArray(option)

  const handleChange = useCallback<ChangeHandler>(event => {
    
    const { checked } = event.target
    if (checkAllVariant) {
      if (checked) change(option)
      else change([])
    }
    else if (option !== undefined) {
      change(selectedOptions => toggleValueInArray(selectedOptions as unknown[], option))
    }
    else change(checked)
    onChange?.(checked)

  }, [option, onChange])

  const checkedCount = checkAllVariant ? (value as unknown[])?.length : undefined
  const allChecked = checkAllVariant ? option?.length === checkedCount : undefined
  // @ts-expect-error
  const indeterminate = checkAllVariant ? (checkedCount > 0 && checkedCount < option?.length) : undefined
  
  // eslint-disable-next-line no-nested-ternary
  const checked = value instanceof Array
    ? (checkAllVariant ? allChecked : value.includes(option))
    : value

  const inputProps = {
    checked: checked ?? false,
    onBlur: blur,
    onChange: handleChange,
    indeterminate
  }
  
  return (
    <Root style={style}>
      <KitCheckbox {...derivedProps} {...inputProps} />
      {label && <Label>{label}</Label>}
    </Root>
  )
}

const MemoCheckbox = React.memo(Checkbox) as typeof Checkbox

export default MemoCheckbox
