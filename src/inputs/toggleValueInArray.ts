export function toggleValueInArray<T>(valueArray: T[], value: T) {
  if (!(valueArray instanceof Array)) valueArray = []

  if (!valueArray.includes(value)) return [...valueArray, value]

  const currentOptionIndex = valueArray.indexOf(value)
  return [
    ...valueArray.slice(0, currentOptionIndex),
    ...valueArray.slice(currentOptionIndex + 1),
  ]
}
