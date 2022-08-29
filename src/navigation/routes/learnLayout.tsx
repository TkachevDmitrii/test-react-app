import { Route, Switch, useRouteMatch } from 'react-router-dom'
import LearnLayoutScreen from 'pages/FirstStage/LearnLayoutScreen'
import { 
  FirstLesson, 
  FourthLesson, 
  SecondLesson, 
  ThirdLesson 
} from 'pages/FirstStage/LearnLayoutScreen/lessons'

function LearnLayout() {
  const { path } = useRouteMatch()
  
  return (
    <Switch>
      <Route exact path={path} component={LearnLayoutScreen} />
      <Route path={`${path}/first`} component={FirstLesson} />
      <Route path={`${path}/second`} component={SecondLesson} />
      <Route path={`${path}/third`} component={ThirdLesson} />
      <Route path={`${path}/fourth`} component={FourthLesson} />
    </Switch>
  )
}

export default LearnLayout
