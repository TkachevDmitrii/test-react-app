import { setIn } from 'final-form'
import { ValidationError, ObjectSchema } from 'yup'
import { FormErrors } from './'

declare global {
  type YupShema<Values extends Record<string, any>> = ObjectSchema<Values, any, any, any>;
}

function validateYupSchema<Values>(schema: YupShema<Values>, values: Record<string, any>) {
  try {
    schema.validateSync(values, { abortEarly: false })
  } catch (error) {
    if (error instanceof ValidationError) {
      let errors = {}
      for (const { path, message } of error.inner) {
        errors = setIn(errors, path as string, message)
      }

      return errors as FormErrors<Values>
    }
  }

  return undefined
}

export default validateYupSchema
