import { createStore, createEvent } from 'effector'

export const setIsFiltersCollapsed = createEvent<boolean>()
export const $isFiltersCollapsed = createStore<boolean>(false).on(setIsFiltersCollapsed, (_state, data) => !data)
