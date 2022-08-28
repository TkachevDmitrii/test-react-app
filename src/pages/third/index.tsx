import { PROPERTIES } from './mock'

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
