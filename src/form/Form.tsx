import { FormApi, FormState, createForm } from 'final-form'
import arrayMutators from 'final-form-arrays'
import deepEqual from 'utils/deepEqual'
import clone from 'utils/clone'
import { useMutableState } from 'hooks'
import { FormProvider } from './FormContext'
import { FieldContextProvider } from './FieldContext'
import { FormErrors, Validate, createFormValidator } from './utils'

declare global {
  interface Window {
    hasDirtyFields: boolean
    currentForm: FormState<Record<string, any>>
  }
}
window.hasDirtyFields = false
window.currentForm = {} as FormState<Record<string, any>>

export interface SubmitData<
  Values extends Record<string, any> = Record<string, any>,
  InitialValues extends Partial<Values> = Partial<Values>
> {
  values: Values
  initialValues?: InitialValues
}

interface FormProps<
  Values extends Record<string, any> = Record<string, any>,
  InitialValues extends Partial<Values> = Partial<Values>
> {
  children?: ReactNode
  onSubmit?: (
    submitData: SubmitData<Values, InitialValues>
  ) => void | FormErrors<Values> | Promise<FormErrors<Values> | void>
  initialValues?: InitialValues
  enableReinitialize?: boolean
  values?: Values
  validate?: Validate<Values>
  disabled?: boolean
  readOnly?: boolean
  onChange?: (values: Values) => void
  markValid?: boolean
  notifyOnUnsavedChanges?: boolean
  onKeyUp?: (event: React.KeyboardEvent) => void
}

type FormMutableState<
  Values extends Record<string, any> = Record<string, any>,
  InitialValues extends Partial<Values> = Partial<Values>
> = {
  form: FormApi<Values, InitialValues>
  preventChangeCallback: boolean
  enableReinitialize: boolean
  notifyOnUnsavedChanges?: boolean
  setFormValues: (values: Partial<Values> | undefined) => void
} & Pick<
  FormProps<Values, InitialValues>,
  'onSubmit' | 'initialValues' | 'values' | 'validate' | 'onChange'
>

const mutators = {
  ...arrayMutators,
}

export function Form<
  Values = Record<string, any>,
  InitialValues extends Partial<Values> = Partial<Values>
>(props: FormProps<Values, InitialValues>) {
  const {
    children,
    onSubmit,
    initialValues,
    enableReinitialize,
    values,
    validate,
    disabled,
    readOnly,
    onChange,
    markValid,
    onKeyUp,
    notifyOnUnsavedChanges = false
  } = props

  const current = useMutableState<FormMutableState<Values, InitialValues>>()

  current.notifyOnUnsavedChanges = notifyOnUnsavedChanges

  if (current.form === undefined) {

    current.form = createForm<Values, InitialValues>({
      mutators,
      initialValues,
      onSubmit: values => current.onSubmit?.({
        values,
        initialValues: current.initialValues
      }),
    })
    current.initialValues = initialValues

    current.setFormValues = values => current.form.change('' as keyof Values, values as Values[keyof Values])
    if (values !== undefined) current.setFormValues(values)
    current.values = values

    current.form.subscribe(
      ({ dirty }) => {
        if (current.notifyOnUnsavedChanges) window.hasDirtyFields = dirty
      },
      { dirty: true }
    )
    current.form.subscribe(
      ({ values }) => {
        !current.preventChangeCallback && current.onChange?.(values)
        if (current.notifyOnUnsavedChanges) window.currentForm = current.form.getState() as FormState<Record<string, any>>
      },
      { values: true }
    )

  }

  useEffect(() => {
    return () => {
      window.hasDirtyFields = false
      window.currentForm = {} as FormState<Record<string, any>>
    }
  }, [])

  current.onSubmit = onSubmit
  current.onChange = onChange
  current.enableReinitialize = enableReinitialize ?? false

  const { form } = current

  useEffect(() => {
    current.preventChangeCallback = true

    if (current.enableReinitialize && !deepEqual(current.initialValues, initialValues)) {
      form.setConfig('initialValues', clone(initialValues))
      current.initialValues = initialValues
    }

    if (!deepEqual(current.values, values)) {
      current.setFormValues(clone(values))
      current.values = values
    }

    if (current.validate !== validate) {
      const validator = createFormValidator<Values>(validate)
      form.setConfig('validate', validator)
      current.validate = validate
    }

    current.preventChangeCallback = false
  })

  const handleResetEvent = useCallback(() => form.reset(), [])

  const handleEnterKeyClick = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      form.submit()
    }
  }, [])

  return (

    <FieldContextProvider {...{ disabled, readOnly, markValid }}>
      <FormProvider form={form}>
        <span style={{ display: 'contents' }} onKeyUp={onKeyUp ?? handleEnterKeyClick} onReset={handleResetEvent}>
          {children}
        </span>
      </FormProvider>
    </FieldContextProvider>

  )
}
