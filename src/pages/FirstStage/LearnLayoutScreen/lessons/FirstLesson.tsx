import { _history } from 'App'
import { BackButton } from 'components'

export const FirstLesson = () => {

  return(
    <>
      <BackButton text='назад' onClick={() => _history.goBack()} />
    </>
  )
}
