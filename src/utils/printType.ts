export function printType(value: any) {
  if (value == null) return (value as string)
  if (value instanceof Object) return `instance of '${(value as Object).constructor.name}'`
  return `type of '${typeof value}'`
}
