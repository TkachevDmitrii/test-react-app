import { Button, Checkbox, palette } from '@my/ui-kit'
import './main.css'
import { useHistory } from 'react-router-dom'
import { _history } from 'App'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const Container = styled.div`
  width: 50%;
  height: 500px;
  border: 5px solid ${palette.GRAY}; 
  padding: 16px;
`
const Text = styled.p`
  color: ${palette.RED};
  font-weight: 600;
  font-size: 24px;
`
const CheckboxText = styled(Text)`
  color: ${palette.DARK};
  font-size: 16px;
  margin-left: 8px;
`
const CheckboxContainer = styled.div`
  display: flex;
  align-items: baseline;
`

export const Main = () => {

  const history = useHistory()

  return (
    <Wrapper>
      <Container>
        <Text>qwe</Text>
        <Text>zxc</Text>
        <Button type='transparent' onClick={() => history.push('second')}>
          Кнопка ведет на Следующий экран
        </Button>
      </Container>
      
      <Container>
        <Text>asd</Text>
        <Text>eeee</Text>
        <CheckboxContainer>
          <Checkbox 
            onChange={({ target }) => console.log('value', target.checked)}
          />
          <CheckboxText>Активировать кнопку</CheckboxText>
        </CheckboxContainer>
      </Container>
    </Wrapper>
  )
}
