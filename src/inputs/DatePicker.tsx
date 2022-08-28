import styled from 'styled-components'
import dayjs, { Dayjs } from 'dayjs'
import { Form as AntDForm } from 'antd'
import { DatePicker as KitDatePicker, palette, InputLabel } from '@my/ui-kit'
import { useField, shouldDisplayFieldError, fieldSubscription, FieldValidator } from 'form'
import { convertDayjsToString } from 'utils'
import { useDerivedFieldProps } from './useDerivedFieldProps'

type KitDatePickerProps = Parameters<typeof KitDatePicker>[0]

type ChangeHandler = (value: Dayjs | null) => void

export interface DatePickerProps
  extends Omit<KitDatePickerProps, 'value' | 'onFocus' | 'onChange' | 'onBlur'>
{
  name: string
  validate?: FieldValidator<Dayjs | null>
  readOnly?: boolean
  onChange?: (value: Dayjs | null) => void
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

interface FormItemProps {
  valid: boolean
  active: boolean | undefined
  error: string | undefined
  children: ReactNode
}

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

const StyledDatePicker = styled(KitDatePicker)`
  width: 100%;
`

function DatePicker({
  name,
  label,
  validate,
  onChange,
  format = 'DD.MM.YYYY',
  picker = 'date',
  ...props
}: DatePickerProps) {

  const { markValid, readOnly, ...derivedProps } = useDerivedFieldProps(props)

  const field = useField<Dayjs | null>(name, { validate, subscription: fieldSubscription })
  const { value, change, blur, active, focus } = field
  const error = field.error ?? field.submitError

  const handleChange = useCallback<ChangeHandler>(value => {
    convertDayjsToString(value)

    change(value)
    onChange?.(value)
  }, [onChange])

  const displayError = shouldDisplayFieldError(field)
  const inputProps = {
    error: displayError,
    errorMessage: error,
    onBlur: blur,
    value: typeof value === 'string' ? dayjs(value) : value,
    onChange: handleChange,
    onFocus: focus,
    format,
    picker,
  }

  return (
    <span onKeyUp={e => e.stopPropagation()}>
      <InputLabel>{label}</InputLabel>
      <FormItem {...{ active, error: displayError ? error : undefined, valid: Boolean(markValid && value) }}>
        <StyledDatePicker {...derivedProps} {...inputProps} />
      </FormItem>
    </span>
  )
}

const MemoDatePicker = React.memo(DatePicker) as typeof DatePicker

export default MemoDatePicker
