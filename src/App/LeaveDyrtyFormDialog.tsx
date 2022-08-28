import React from 'react'
import { createStore, createApi } from 'effector'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { Alert, Icon, palette } from '@my/ui-kit'
import { originalHistory, PushParams } from './history'

const $confirmDialog = createStore(false)

const { open, close } = createApi($confirmDialog, {
  open: () => true,
  close: () => false,
})

let currentArgs: PushParams | Function | null = null
export const startConfirmation = (...args: PushParams | [Function]): void => {
  currentArgs =
    args[0] instanceof Function
      ? args[0] as Function
      : args as PushParams
  open()
}

const confirm = () => {
  close()
  if (currentArgs !== null) {
    if (currentArgs instanceof Function) currentArgs()
    else originalHistory.push(...currentArgs)
    currentArgs = null
  }
}
const reject = () => {
  close()
  currentArgs = null
}

const Root = styled.div`
  font-size: 16px;
  font-weight: 600;
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-bottom: 24px;
  > :not(:nth-child(1)) {
    margin-left: 12px;
  }
`

export const LeaveDyrtyFormDialog: React.FC = () => {
  const open = useStore($confirmDialog)

  return (
    <Alert
      confirmation
      noHandler={reject}
      position='center'
      visible={open}
      yesHandler={confirm}
    >
      <Root>
        <Icon color={palette.RED} height={22} type='hint' width={22} />
        <span>Выйти без сохранения?</span>
      </Root>
    </Alert>
  )
}
