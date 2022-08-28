import { createStore, createApi, createEvent } from 'effector'
import { useStoreMap } from 'effector-react'

interface SelectionStore<Key = any, Data = any> {
  selectedKeyList: Key[]
  selectedDataList: Data[]
}

interface ToggleSelectionParams {
  key: any
  data?: any
  multiple?: boolean
}

export const resetSelection = createEvent()

const selection = createStore<SelectionStore>({
  selectedKeyList: [],
  selectedDataList: [],
}).reset(resetSelection)

const { toggle, clear } = createApi(selection, {
  toggle: (store, params: ToggleSelectionParams) => {

    const { selectedKeyList, selectedDataList } = store
    const { key, data, multiple } = params

    const keyIndex = selectedKeyList.indexOf(key)
    if (keyIndex === -1)
      return {
        selectedKeyList: multiple ? [...selectedKeyList, key] : [key],
        selectedDataList: multiple ? [...selectedDataList, data] : [data],
      }
    return {
      selectedKeyList: multiple
        ? [...selectedKeyList.slice(0, keyIndex), ...selectedKeyList.slice(keyIndex + 1)]
        : [],
      selectedDataList: multiple
        ? [...selectedDataList.slice(0, keyIndex), ...selectedDataList.slice(keyIndex + 1)]
        : [],
    }

  },

  clear: () => {
    return {
      selectedKeyList: [],
      selectedDataList: [],
    }
  }
})

export const toggleSelection = (params: ToggleSelectionParams): void => {
  toggle(params)
}

export const getSelection = () => selection.getState()

export function useSelection<Key, Data>() {
  const result = useStoreMap({
    store: selection,
    keys: [],
    fn: ({ selectedKeyList, selectedDataList }) => [selectedKeyList, selectedDataList],
  })

  useEffect(() => {
    return () => {
      clear()
    }
  }, [])

  return result as [Key[], Data[]]
}
