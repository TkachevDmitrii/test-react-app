import { createStore, createEvent } from 'effector'

export const setReward = createEvent<number>()
export const $reward = createStore<number>(0).on(setReward, (_, number) => number)
