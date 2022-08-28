import { useMutableState } from 'hooks'
import { Validate, createFormValidator } from './utils'
import { useForm } from './'

interface UseFormValidationMutableState<
  Values extends Record<string, any> = Record<string, any>
> {
  validate: Validate<Values>
}

export function useFormValidation<
  Values extends Record<string, any> = Record<string, any>
>(validate: Validate<Values>) {

  const form = useForm<Values>()

  const current = useMutableState<UseFormValidationMutableState<Values>>()

  useEffect(() => {
    if (current.validate !== validate) {
      const validator = createFormValidator<Values>(validate)
      form.setConfig('validate', validator)
      current.validate = validate
    }

    return () => form.setConfig('validate', undefined)
  }, [validate])
}
