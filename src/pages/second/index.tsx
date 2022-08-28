import { Button, Checkbox, palette } from '@my/ui-kit'
import { _history } from 'App'
import { data } from './mock'

interface ITableProps {
  text: string | number
}
interface ITableElementsProps {
  id: number
  brandName: string
  modelName: string
  carClass: string
}

const ListContainer = styled.div`
  border: 1px solid ${palette.DARK};
  border-radius: 7px;
  margin-top: 24px;
  padding: 8px;
`
const TableHeaderContainer = styled.div`
  display: flex;
`
const HeaderItemContainer = styled.div`
  width: 200px;
`
const HeaderItem = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${palette.DARK};
`
const TableElementContainer = styled(TableHeaderContainer)`
`
const TableElement = styled(HeaderItem)`
  width: 200px;
  font-size: 14px;
  font-weight: 400;
`

const TableHeaderElement = ({ text }: ITableProps) => (
  <HeaderItemContainer>
    <HeaderItem>{text}</HeaderItem>
  </HeaderItemContainer>
)

const TableElements = ({ id, brandName, modelName, carClass }: ITableElementsProps) => (
  <TableElementContainer>
    <TableElement>{id}</TableElement>
    <TableElement>{brandName}</TableElement>
    <TableElement>{modelName}</TableElement>
    <TableElement>{carClass}</TableElement>
  </TableElementContainer>
)

const headerItems = ['id', 'Название бренда', 'Название модели', 'Класс ТС']

export const SecondScreen = () => {
  const cars = data
  console.log('cars', cars)

  return (
    <>
      <Button onClick={() => _history.goBack()}>back</Button>
      <ListContainer>
        <TableHeaderContainer>
          {headerItems.map((item, key) => 
            <TableHeaderElement key={key} text={item} />
          )}
        </TableHeaderContainer>
        {cars.map(({ id, brandName, modelName, carClass }, key) =>
          <TableElements 
            key={key}
            id={id}
            brandName={brandName}
            modelName={modelName}
            carClass={carClass}
          />
        )}
      </ListContainer>
    </>
  )
}
