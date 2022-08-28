// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history'
import { startConfirmation } from './LeaveDyrtyFormDialog'

export const originalHistory = createBrowserHistory()

export type PushParams = Parameters<typeof originalHistory['push']>

export const _history: typeof originalHistory = {
  ...originalHistory,
  push: (...args: PushParams) => {
    if (window.hasDirtyFields) startConfirmation(...args)
    else originalHistory.push(...args)
  },
}
