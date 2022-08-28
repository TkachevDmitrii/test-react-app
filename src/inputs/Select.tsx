import { Select as KitSelect, SelectValue, SelectProps as KitSelectProps } from '@my/ui-kit'
import { useField, shouldDisplayFieldError, fieldSubscription, FieldValidator } from 'form'
import { useDerivedFieldProps } from './useDerivedFieldProps'

type ChangeHandler<Value extends SelectValue> = NonNullable<KitSelectProps<Value>['onChange']>

export interface SelectOption<Value extends SelectValue> {
  label: string
  value: Value
  marker?: React.ReactNode
}

export interface SelectProps<Value extends SelectValue> extends Omit<
  KitSelectProps<Value>,
  'error' | 'errorMessage' | 'isValid' | 'onChange' | 'onBlur' | 'options'
> {
  validate?: FieldValidator<Value[]>
  readOnly?: boolean
  onChange?: (value: Value[]) => void
  name: string
  options: SelectOption<Value>[]
  defaultValue?: Value
}

function Select<Value extends SelectValue>({
  name,
  validate,
  onChange,
  defaultValue,
  ...props
}: SelectProps<Value>) {

  const { markValid, readOnly, ...derivedProps } = useDerivedFieldProps(props)

  const field = useField<Value[]>(name, { validate, subscription: fieldSubscription })
  const { value, change, blur } = field
  const error = field.error ?? field.submitError

  const handleChange = useCallback<ChangeHandler<Value>>(value => {
    change(value)
    onChange?.(value)
  }, [onChange])

  const displayError = shouldDisplayFieldError(field)

  const inputProps = {
    error: displayError,
    errorMessage: error,
    onBlur: blur,
    value: value,
    onChange: handleChange,
  }
  
  return (
    <KitSelect {...derivedProps} {...inputProps} isValid={markValid && value && !displayError} defaultValue={defaultValue} />
  )
  
}

const MemoSelect = React.memo(Select) as typeof Select

export default MemoSelect
