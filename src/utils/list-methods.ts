export function orderByProperty<T extends Record<string, any>[]>(list: T, name: string, order?: string) {
  if (!name) {
    if (order === 'desc') return list.reverse() as T
    return list
  }
  return list.sort(
    order === 'desc'
      ? ((a, b) => a[name] < b[name] ? 1 : -1)
      : ((a, b) => a[name] > b[name] ? 1 : -1)
  )
}

export function getPageData<T extends Record<string, any>[]>(list: T, page: number, pageSize: number) {
  return list.slice(pageSize * (page - 1), pageSize * page) as T
}
