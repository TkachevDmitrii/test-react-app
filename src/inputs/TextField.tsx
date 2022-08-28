import styled from 'styled-components'
import { Input as KitInput, TextArea as KitTextArea } from '@my/ui-kit'
import { useField, shouldDisplayFieldError, fieldSubscription, FieldValidator } from 'form'
import { useDerivedFieldProps } from './useDerivedFieldProps'

type KitInputProps = Parameters<typeof KitInput>[0]

type ChangeHandler = NonNullable<KitInputProps['onChange']>

type TextFieldInputType = KitInputProps['type'] | 'multiline'

type TextFieldValue<InputType extends TextFieldInputType> = InputType extends 'number' ? number : string

export interface TextFieldProps<InputType extends TextFieldInputType>
  extends Omit<KitInputProps, 'value' | 'error' | 'errorMessage' | 'isValid' | 'onChange' | 'onBlur' | 'type'>
{
  validate?: FieldValidator<TextFieldValue<InputType>>
  readOnly?: boolean
  onChange?: (value: TextFieldValue<InputType>) => void
  type?: InputType
}

const InputWrapper = styled.div`
  width: 100%;
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  .ant-input-textarea {
    border: none;
    padding-left: 0;
  }

  .ant-input-clear-icon {
    display: flex;
    align-items: center;
  }
`

function TextField<InputType extends TextFieldInputType = 'text'>({
  name,
  validate,
  onChange,
  type = 'text',
  ...props
}: TextFieldProps<InputType>) {

  const { markValid, readOnly, ...derivedProps } = useDerivedFieldProps(props)

  const field = useField<TextFieldValue<InputType>>(name, { validate, subscription: fieldSubscription })
  const { value, change, blur } = field
  const error = field.error ?? field.submitError

  const handleChange = useCallback<ChangeHandler>(value => {
    const nextValue = (type === 'number' && value ? Number(value) : value) as TextFieldValue<InputType>
    change(nextValue)
    onChange?.(nextValue)
  }, [onChange, type])

  const displayError = shouldDisplayFieldError(field)

  const inputProps = {
    error: displayError,
    errorMessage: error,
    onBlur: blur,
    value: value?.toString() ?? '',
    onChange: handleChange,
  }

  if (type === 'multiline') {
    return (
      <InputWrapper>
        <KitTextArea {...derivedProps} {...inputProps} />
      </InputWrapper>
    )
  }

  return (
    <InputWrapper>
      <KitInput {...derivedProps} type={type} {...inputProps} isValid={markValid && value && !displayError} />
    </InputWrapper>
  )
}

const MemoTextField = React.memo(TextField) as typeof TextField

export default MemoTextField
