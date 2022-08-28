import { printType } from 'utils'

const NameContext = React.createContext<string | undefined>(undefined)

export const NameProvider = NameContext.Provider

function validateNameProp(name: string | undefined) {
  if (name === undefined) return
  const type = typeof name
  if (type !== 'string') throw new Error(`[Form] The 'name' property must be of type 'string' but got: ${printType(name)}`)
  if (name === '') throw new Error("[Form] The 'name' property must not be an empty string")
}

export function useFieldName(name: string | undefined) {
  const parentName = useContext(NameContext)

  if (parentName === undefined && name === undefined)
    throw new Error('[Form] Field name cannot be undefined')
  validateNameProp(name)
  validateNameProp(parentName)

  return parentName && name
    ? `${parentName}.${name}`
    : parentName ?? (name as string)
}
