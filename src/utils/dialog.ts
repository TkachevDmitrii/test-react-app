import { createStore, createApi } from 'effector'
import { useStoreMap } from 'effector-react'
import { startConfirmation } from 'App/LeaveDyrtyFormDialog'
import deepEqual from 'utils/deepEqual'

type DialogStore = {
  data: any
  key: string | null
}

const $dialog = createStore<DialogStore>({ data: null, key: null })

const { open, close } = createApi($dialog, {
  open: (value, params: { key: string; data: any }) => params,
  close: ({ data }) => ({ data, key: null }),
})

export const openDialog = (key: string, data: any = null): void => {
  open({ key, data })
}
export const closeDialog = (checkDirtyFields?: boolean) => {
  const { values, initialValues } = window.currentForm ?? {}
  if (checkDirtyFields === true && !deepEqual(values, initialValues, true)) startConfirmation(close)
  else close()
}

type UseDialogProps<T> = {
  data: T
  open: boolean
}

export const useDialog: <T>(key: string) => UseDialogProps<T> = key => {
  return useStoreMap({
    store: $dialog,
    keys: [key],
    fn: ({ data, key: dialogKey }, [currentKey]) =>
      dialogKey === currentKey ? { open: true, data } : { open: false, data },
  })
}
