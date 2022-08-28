import { FieldState, FieldSubscription, FormApi, getIn, FORM_ERROR, ARRAY_ERROR } from 'final-form'
import { isSchema } from 'yup'
import { printType } from 'utils'
import validateYupSchema from './validateYupSchema'

export type FieldArrayError = FieldError[] & { [ARRAY_ERROR]?: string }
export type FieldError = string | Record<string, any> | undefined | FieldArrayError
export type FieldValidator<Value> = (value: Value) => FieldError | Promise<FieldError>
export type FieldArrayValidator<Value> = (values: Value[]) => FieldError | Promise<FieldError>

export type FormErrors<Values>
  = { [Key in keyof Values]?: string }
  & { [FORM_ERROR]?: string }
  | undefined

export type Validate<Values extends Record<string, any> = Record<string, any>>
  = ((values: Values) => FormErrors<Values> | Promise<FormErrors<Values>>) | YupShema<Record<string, any>>

export function getCurrentFieldState<Value>(form: FormApi, name: string) {
  const state = form.getFieldState(name) as FieldState<Value>
  if (state != null) return state

  const formState = form.getState()
  const value = getIn(formState.values, name)

  return { value } as FieldState<Value>
}

export function shouldDisplayFieldError(fieldState: FieldState<any>) {
  const { touched, error, dirtySinceLastSubmit, submitError, submitFailed } = fieldState

  return ((touched || submitFailed) && Boolean(error) && typeof error === 'string')
  || (!dirtySinceLastSubmit && Boolean(submitError) && typeof submitError === 'string')
}

export function createFieldValidator<Value>(validate?: FieldValidator<Value>) {
  if (validate === undefined) return undefined
  if (validate instanceof Function) return (value: Value) => validate(value)
  throw new Error(`[Form] The 'validate' property must be an instance of 'Function' but got: ${printType(validate)}`)
}

export function createFormValidator<
  Values extends Record<string, any> = Record<string, any>
>(validate: Validate<Values> | undefined) {
  if (validate === undefined) return undefined
  if (isSchema(validate)) return (values: Values) => validateYupSchema(validate as YupShema<Values>, values)
  if (validate instanceof Function) return validate
  throw new Error(`[Form] The 'validate' property must be an instance of 'Function' but got: ${printType(validate)}`)
}

export const inputSubscription: FieldSubscription = {
  value: true,
  dirty: true,
}

export const errorSubscription: FieldSubscription = {
  touched: true,
  submitFailed: true,
  error: true,
  dirtySinceLastSubmit: true,
  submitError: true,
  active: true,
}

export const fieldSubscription: FieldSubscription = {
  ...inputSubscription,
  ...errorSubscription,
}
