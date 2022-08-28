import { FormState, FormSubscription, formSubscriptionItems } from 'final-form'
import { useForm } from './'

const allFormSubscriptions = formSubscriptionItems.reduce<FormSubscription>(
  (result, key) => {
    result[key as keyof FormSubscription] = true

    return result
  },
  {}
)

export function useFormState<
  Values extends Record<string, any> = Record<string, any>,
  InitialValues extends Partial<Values> = Partial<Values>
>(subscription?: FormSubscription) {

  const form = useForm<Values, InitialValues>()
  const [formState, setFormState] = useState<FormState<Values, InitialValues>>()

  useEffect(() => {
    const unsubscribe = form?.subscribe(
      state => setFormState(state as FormState<Values, InitialValues>),
      subscription ?? allFormSubscriptions
    )

    return unsubscribe
  }, [subscription])

  return formState ?? form?.getState()
}
