import { queryClient } from 'App/query-client'

export function getQueryData<Data>(...keys: string[]) {
  const [query] = queryClient.getQueryCache().findAll([...keys])
  return query?.state.data as Data
}

export function getActiveQueryData<Data>(...keys: string[]) {
  const [query] = queryClient.getQueryCache().findAll([...keys], { active: true })
  return query?.state.data as Data
}

export function refetchActiveQuery(...keys: string[]) {
  queryClient.refetchQueries([...keys], { active: true })
}
