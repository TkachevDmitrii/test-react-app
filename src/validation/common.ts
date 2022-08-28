import * as yup from 'yup'
import { 
  PASSWORD_NO_MATCH_MESSAGE, 
  REQUIRED_MESSAGE, 
  INCORRECT_PASSWORD_MESSAGE, 
  REQUIRED_FIELD_MESSAGE, 
  WRONG_EMAIL_MESSAGE, 
  WRONG_SYMBOLS_MESSAGE, 
  WRONG_LANGUAGE_MESSAGE, 
} from './messages'
import { VALIDATORS } from './validators'

export function required(value: any) {
  if (value === 0) return

  if (!value) return REQUIRED_MESSAGE
}

export function validateName(value: string | undefined, fieldName: string) {
  if (!value) return

  const wrong = VALIDATORS.specSymbolsWithCyrillicNoYup.test(value)
  if (wrong) return WRONG_SYMBOLS_MESSAGE

  const cyrillic = VALIDATORS.cyrillicOnly.test(value)
  if (!cyrillic) return WRONG_LANGUAGE_MESSAGE(fieldName)
}

export function validateRequired(value: any) {
  if (!value) return REQUIRED_FIELD_MESSAGE
}

export function validateRequiredFirstName(value: string | undefined) {
  const msg = validateRequired(value)
  if (msg) return msg
  return validateName(value, 'Имя')
}

export function validateRequiredLastName(value: string | undefined) {
  const msg = validateRequired(value)
  if (msg) return msg
  return validateName(value, 'Фамилия')
}

export function validateRequiredMiddleName(value: string | undefined) {
  return validateName(value, 'Отчество')
}

export function validateEmail(value?: string) {
  if (!value) return

  const wrong = VALIDATORS.specSymbols.test(value)
  if (wrong) return WRONG_SYMBOLS_MESSAGE

  return
}

export function validateCorporateEmail(value?: string) {
  if (!value) return

  const wrong = VALIDATORS.specSymbols.test(value)
  if (wrong) return WRONG_SYMBOLS_MESSAGE

  const format = value.includes('@my-llc.ru')
  if (!format) return WRONG_EMAIL_MESSAGE

  return
}

export function validateRequiredEmail(value?: string) {
  const msg = validateRequired(value)
  if (msg) return msg
  
  return validateEmail(value)
}

export function validateRequiredCorporateEmail(value?: string) {
  const msg = validateRequired(value)
  if (msg) return msg

  return validateCorporateEmail(value)
}

export const VALIDATION = {
  password: yup
    .string()
    .trim()
    .required(REQUIRED_FIELD_MESSAGE),

  resetPassword: yup
    .string()
    .trim()
    .required(REQUIRED_FIELD_MESSAGE)
    .min(6, INCORRECT_PASSWORD_MESSAGE)
    .test('password', INCORRECT_PASSWORD_MESSAGE, value => {
      if (!value) return true

      const password = VALIDATORS.password.test(value)

      return password
    }),
  passwordConfirmation: yup
    .string()
    .trim()
    .required(REQUIRED_FIELD_MESSAGE)
    .min(6, INCORRECT_PASSWORD_MESSAGE)
    .test('password', PASSWORD_NO_MATCH_MESSAGE, function (value) {
      return this.parent.password === value
    }),
  email: yup
    .string()
    .trim()
    .required(REQUIRED_FIELD_MESSAGE)
}

export const passwordSchema = yup.object().shape({
  password: VALIDATION.resetPassword,
  passwordConfirmation: VALIDATION.passwordConfirmation,
})

export const signInSchema = yup.object().shape({
  login: VALIDATION.email,
  password: VALIDATION.password,
})

export const forgetPassSchema = yup.object().shape({
  login: VALIDATION.email,
})
