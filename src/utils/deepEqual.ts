/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-for-in-array */

function isEqual(value1: any, value2: any) {
  if (
    (value1 == null || value1 === '')
     && (value2 == null || value2 === '')
  ) return true
  return value1 === value2
}

function deepEqual(value1: any, value2: any, checkForEmptyValues = false): boolean {
  if (value1 instanceof Object && value2 instanceof Object) {
    if (value1.constructor !== value2.constructor) return false

    if (value1 instanceof Array) {
      if (!checkForEmptyValues) {
        if (value1?.length !== value2?.length) return false
      }
      for (const index in value1) {
        if (!deepEqual(value1[index], value2[index], checkForEmptyValues)) return false
      }
      return true
    }

    const keys1 = Object.keys(value1)
    const keys2 = Object.keys(value2)
    if (!checkForEmptyValues) {
      if (keys1?.length !== keys2?.length) return false
    }
    for (const index in keys1) {
      const key = keys1[index]
      if (!checkForEmptyValues) {
        if (!keys1.includes(keys2[index])) return false
      }
      if (!deepEqual(value1[key], value2[key], checkForEmptyValues)) return false
    }
    return true
  }

  return checkForEmptyValues ? isEqual(value1, value2) : value1 === value2
}

export default deepEqual
