declare type InputType =
  | 'text'
  | 'password'
  | 'search'
  | 'phone'
  | 'date'
  | 'number'

declare type InputHeight = 'S' | 'L'

type LabelComponent = () => JSX.Element

declare interface InputProps {
  type?: InputType
  clearable?: boolean
  pattern?: string
  label?: string | LabelComponent
  error?: boolean
  placeholder?: string
  errorMessage?: string
  isValid?: boolean
  hint?: string
  outline?: boolean
  value?: string
  name?: string
  height?: InputHeight
  className?: string
  capitalize?: boolean
  disabled?: boolean
  rows?: number
  paddingText?: string
  onChange?: (e: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onSearch?: () => void
  maxLength?: number
  margin?: string
  withDefaultValue?: boolean
}

interface OnChange {
  onChange: (e: import('react').ChangeEvent<HTMLInputElement>) => void
}

declare type SearchProps = Pick<
  InputProps,
  | 'clearable'
  | 'name'
  | 'onBlur'
  | 'onFocus'
  | 'onSearch'
  | 'value'
  | 'placeholder'
  | 'height'
  | 'outline'
  | 'className'
  | 'paddingText'
> &
OnChange & { isFocused: boolean }

declare type StyledInputProps = Pick<InputProps, 'disabled' | 'paddingText'> & {
  $isFocused: boolean
  $error?: boolean
  $outline?: boolean
} & Required<Pick<InputProps, 'height'>>

declare type StyledSearchProps = Pick<SearchProps, 'height' | 'paddingText'> & {
  $isFocused: boolean
  $outline?: boolean
}
