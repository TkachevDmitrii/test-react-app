/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-for-in-array */

function shallowEqual(value1: any, value2: any): boolean {
  if (value1 instanceof Object && value2 instanceof Object) {
    if (value1.constructor !== value2.constructor) return false

    if (value1 instanceof Array) {
      if (value1?.length !== value2?.length) return false
      for (const index in value1) {
        if (value1[index] !== value2[index]) return false
      }
      return true
    }

    const keys1 = Object.keys(value1)
    const keys2 = Object.keys(value2)
    if (keys1?.length !== keys2?.length) return false
    for (const index in keys1) {
      const key = keys1[index]
      if (!keys1.includes(keys2[index])) return false
      if (value1[key] !== value2[key]) return false
    }
    return true
  }

  return value1 === value2
}

export default shallowEqual
