import { classes } from 'utils'
import { useFieldContext } from 'form'

type DerivedFieldProps<T> = T & {
  disabled?: boolean
  readOnly?: boolean
  className?: string
  markValid?: boolean
}

export function useDerivedFieldProps<T>({
  disabled,
  readOnly,
  className,
  ...props
}: DerivedFieldProps<T>) {
  const ctx = useFieldContext()

  disabled = ctx.disabled || disabled
  readOnly = ctx.readOnly || readOnly
  className = classes(readOnly ? 'readonly' : undefined, className)

  return {
    ...props,
    markValid: ctx.markValid,
    disabled: disabled || readOnly,
    readOnly,
    className,
  }
}
