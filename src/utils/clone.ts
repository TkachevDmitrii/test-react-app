/* eslint-disable guard-for-in */

function cloneObject(target: any, substitute: any) {
  const newObject = Object()
  for (const key in target) newObject[key] = clone(target[key], substitute)
  return newObject
}

function clone(target: any, substitute?: any): any {
  if (target instanceof Array) return target.map((value: any) => clone(value, substitute))
  if (target instanceof Object && target.constructor === Object)
    return cloneObject(target, substitute)
  return substitute === undefined ? target : substitute
}

export default clone
