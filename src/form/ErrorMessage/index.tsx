import { useFieldName } from '../NameContext'
import { FieldErrorMsg } from './FieldErrorMsg'
import { FormErrorMsg } from './FormErrorMsg'

type ErrorMessageProps<Component extends React.ElementType>
  = GenericComponentProps<Component>
  & { name?: string }

function ErrorMessage<
  Component extends React.ElementType = 'div'
>({ name, ...props }: ErrorMessageProps<Component>) {

  let currentName: string | undefined
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    currentName = useFieldName(name)
  } catch {}

  return currentName === undefined
    ? <FormErrorMsg {...props} />
    : <FieldErrorMsg name={currentName} {...props} />
}

const MemoErrorMessage = React.memo(ErrorMessage) as typeof ErrorMessage

export default MemoErrorMessage
