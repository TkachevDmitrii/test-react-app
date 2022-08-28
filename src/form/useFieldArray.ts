import { FieldSubscription, FieldState, ARRAY_ERROR, getIn } from 'final-form'
import type { Mutators as ArrayMutators } from 'final-form-arrays'
import { useForm, useField, FieldArrayValidator, FieldArrayError, useFieldContext, getCurrentFieldState } from './'

interface UseFieldArrayConfig<Value> {
  validate?: FieldArrayValidator<Value>
}

const arraySubscriptions: FieldSubscription = {
  length: true,
}

export function useFieldArray<Value>(name: string | undefined, config: UseFieldArrayConfig<Value>) {
  const {
    validate: validateFn,
  } = config ?? {}

  const { disabled, readOnly } = useFieldContext()
  const form = useForm()

  const validate = useCallback(
    async (values) => {
      if (!validateFn) return undefined
      const error = await validateFn(values)
      if (!error || Array.isArray(error)) {
        return error
      }

      return { [ARRAY_ERROR]: error } as FieldArrayError
    },
    [validateFn]
  )

  const { length, name: currentName } = useField<Value[]>(name, {
    subscription: arraySubscriptions,
    validate,
  })

  const map = useCallback(
    (callback: (index: number) => any) => {
      const { value: values } = getCurrentFieldState<Value[]>(form, currentName)

      return (values ?? []).map((value, index) => callback(index))
    },
    [currentName]
  )

  const arrayMutators = useMemo(
    () => {
      const { push, remove } = form.mutators as unknown as ArrayMutators

      return {
        push: (value?: Value) => push(currentName, value),
        remove: (index: number) => remove(currentName, index),
      }
    },
    [currentName]
  )

  return {
    map,
    ...arrayMutators,
    length: length ?? 0,
    readOnly, disabled,
  }
}
