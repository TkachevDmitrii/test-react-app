import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { MainScreen } from 'pages/MainScreen'
// import WorkerProfilePage from 'pages/worker/WorkerProfilePage'

function Main() {
  const { path } = useRouteMatch()
  
  return (
    <Switch>
      <Route exact path={path} component={MainScreen} />
      {/* <Route path={`${path}/:id`} component={WorkerProfilePage} /> */}
    </Switch>
  )
}

export default Main
