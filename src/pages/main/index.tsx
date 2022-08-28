import { palette } from '@my/ui-kit'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const Container = styled.div`
  width: 50%;
  height: 500px;
  border: 5px solid ${palette.GRAY}; 
`
const Text = styled.p`
  color: ${palette.RED};
  font-weight: 600;
  font-size: 24px;
`

export const Main = () => {

  return (
    <Wrapper>
      <Container>
        <Text>qwe</Text>
        <Text>zxc</Text>
      </Container>
      
      <Container>
        <Text>asd</Text>
        <Text>eeee</Text>
      </Container>
    </Wrapper>
  )
}
