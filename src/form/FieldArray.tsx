import { useFieldArray } from './useFieldArray'
import { FieldArrayValidator } from './utils'

type FieldArrayRenderProps<Value> = {
  push: (value?: Value) => void
  remove: (index: number) => void
  length: number
  readOnly?: boolean
  disabled?: boolean
  map: <R>(callback: (index: number) => R) => R[]
}

interface FieldArrayProps<Value> {
  name?: string
  validate?: FieldArrayValidator<Value>
  children?: (props: FieldArrayRenderProps<Value>) => ReactElement
}

export function FieldArray<Value>({ name, validate, children: renderFn }: FieldArrayProps<Value>) {

  const fieldArray = useFieldArray<Value>(name, { validate })

  return renderFn?.(fieldArray) ?? null
}
