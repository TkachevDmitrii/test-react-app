import { palette } from '@my/ui-kit'
import { PROPERTIES } from './mock'

const StyledStroke = styled.div`
  margin-top: 16px;
  display: flex;
`
const Text = styled.p`
  color: ${palette.GRAY_6};
  margin-right: 8px;
`

const TASK_TEXT = 'Нужно сверстать компонент для вывода\
  характеристик в виде дерева. Стили не важны, главное сохранить\
  отступы, заголовки групп (иконки можно не выводить) и чередующуюся\
  раскраску строк.'

export const ThirdScreen = () => {
  const data = PROPERTIES
  console.log('data', data)

  return  (
    <>
      <img src='./result.png' />
      <p>{TASK_TEXT}</p>
    </>
  )
}
