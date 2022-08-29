import { Button, palette } from '@my/ui-kit'
import { _history } from 'App'

interface ILessonProps {
  name: string
  route: string
}

const Container = styled.div`
  border: 1px solid ${palette.GRAY};
  border-radius: 5px;
  padding: 16px 10px;
  margin-bottom: 16px;
`
const Text = styled.p`
  display: flex;
  color: ${palette.DARK};
`
const FatText = styled(Text)`
  font-weight: 500;
  margin-right: 4px;
  margin-left: 4px;
`
const Label = styled(Text)`
  font-size: 16px;
  font-weight: 500;
`
const HintLabel = styled(Label)`
  color: ${palette.RED};
`
const LessonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const LessonWrapper = styled.div`
  margin: 10px;
`

const screens = [
  { name: '1 урок', route: 'first' },
  { name: '2 урок', route: 'second' },
  { name: '3 урок', route: 'third' },
  { name: '4 урок', route: 'fourth' },
]

const Lesson = ({ name, route }: ILessonProps) => (
  // <LessonWrapper onClick={() =>  _history.push(`/LearnLayout/${route}`)}>
  //   <LessonText>{name}</LessonText>
  // </LessonWrapper>
  <LessonWrapper>
    <Button 
      onClick={() =>  _history.push(`/LearnLayout/${route}`)}
      type='transparent'
    >
      {name}
    </Button>
  </LessonWrapper>
)

export const LearnLayoutScreen = () => {

  return (
    <>
      <Container>
        <Label>Верстка:</Label>
        <Text>В данном разделе мы научимся работать с версткой.</Text>
        <Text>Будем - <FatText>двигать / красить / менять размеры</FatText> и прочее в этом духе.</Text>
        <Text>Ниже представлены задачи, которые необходимо решить для продвижения на следующий этап.</Text>
        <Text>Также в каждом разделе будут подробные указания и подсказки.</Text>
      </Container>

      <Container>
        <HintLabel>ВАЖНО:</HintLabel>
        <Text>Расположение необходимых экранов - <FatText>pages/FirstStage/lessons/*task_name*</FatText></Text>
      </Container>

      <LessonsContainer>
        {screens.map(({ name, route }, key) => 
          <Lesson name={name} route={route} key={key} />
        )}
      </LessonsContainer>
    </>
  )
}
