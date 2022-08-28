import styled from 'styled-components'
import dayjs, { Dayjs } from 'dayjs'
import { Form as AntDForm } from 'antd'
import { RangeDatePicker as KitRangeDatePicker, palette, InputLabel } from '@my/ui-kit'
import { useField, shouldDisplayFieldError, fieldSubscription, FieldValidator } from 'form'
import { convertDayjsToString } from 'utils'
import { useDerivedFieldProps } from './useDerivedFieldProps'

type KitRangeDatePickerProps = Parameters<typeof KitRangeDatePicker>[0]

type ChangeHandler = (value: Dayjs[] | null) => void

export interface RangeDatePickerProps
  extends Omit<KitRangeDatePickerProps, 'value' | 'onFocus' | 'onChange' | 'onBlur' >
{
  name: string
  validate?: FieldValidator<Dayjs[] | null>
  readOnly?: boolean
  onChange?: (value: Dayjs[] | null) => void
}

interface FormItemProps {
  valid: boolean
  active: boolean | undefined
  error: string | undefined
  children: ReactNode
}

const StyledFormItem = styled(AntDForm.Item)<Parameters<typeof AntDForm.Item>[0]>`
  .ant-form-item-explain-error {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5; 
    color: ${palette.RED};
    margin-top: 4px;
  }
  .ant-picker-status-error {
    border-color: ${palette.RED};
  }
`

function FormItem({ valid, active, error,  children }: FormItemProps) {

  const validateStatus = active ? undefined : (valid && 'success') || (error && 'error')

  return (
    <StyledFormItem
      colon
      hasFeedback
      help={error}
      validateStatus={validateStatus}
    >
      {children}
    </StyledFormItem>
  )
}

const StyledRangeDatePicker = styled(KitRangeDatePicker as any)`
  width: 100%;
`

function RangeDatePicker({
  name,
  label,
  validate,
  onChange,
  format = 'DD.MM.YYYY',
  picker = 'date',
  ...props
}: RangeDatePickerProps) {

  const { markValid, readOnly, ...derivedProps } = useDerivedFieldProps(props)

  const field = useField<Dayjs[] | null>(name, { validate, subscription: fieldSubscription })
  const { value, change, blur, active, focus } = field
  const error = field.error ?? field.submitError

  const handleDateChange = useCallback<ChangeHandler>(value => {
    convertDayjsToString(value)
    
    change(value)
    onChange?.(value)
  }, [onChange])

  const handleTimeChange = useCallback<ChangeHandler>(value => {
    if (value) {
      if (value[0]) value[0].toString = () => value[0].format('HH:mm')
      if (value[1]) value[1].toString = () => value[1].format('HH:mm')
    }

    change(value)
    onChange?.(value)
  }, [onChange])

  const displayError = shouldDisplayFieldError(field)

  const getValues = (value?: string[] | Dayjs[] | null) => (
    value && typeof value[0] === 'string' && typeof value[1] === 'string' ? 
      value.map(date => dayjs(date)) : value
  )

  const inputProps = {
    error: displayError,
    errorMessage: error,
    onBlur: blur,
    value: getValues(value),
    onChange: picker === 'date' ? handleDateChange : handleTimeChange,
    onFocus: focus,
    format,
    picker,
  }

  return (
    <span onKeyUp={e => e.stopPropagation()}>
      <InputLabel>{label}</InputLabel>
      <FormItem {...{ active, error: displayError ? error : undefined, valid: Boolean(markValid && value) }}>
        <StyledRangeDatePicker {...derivedProps} {...inputProps} />
      </FormItem>
    </span>
  )
}

const MemoRangeDatePicker = React.memo(RangeDatePicker) as typeof RangeDatePicker

export default MemoRangeDatePicker
