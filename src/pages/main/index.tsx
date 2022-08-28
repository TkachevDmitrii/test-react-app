import { palette } from '@my/ui-kit'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const Text = styled.p`
  color: ${palette.RED};
`

export const Main = () => {

  return (
    <Wrapper>
      <div>
        <Text>qwe</Text>
        <Text>zxc</Text>
      </div>
      
      <div>
        <Text>asd</Text>
        <Text>eeee</Text>
      </div>
    </Wrapper>
  )
}
