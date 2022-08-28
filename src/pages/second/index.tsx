import { Button, Checkbox, palette } from '@my/ui-kit'
import { _history } from 'App'

export const SecondScreen = () => {

  return (
    <>
      <Button onClick={() => _history.goBack()}>back</Button>
    </>
  )
}
