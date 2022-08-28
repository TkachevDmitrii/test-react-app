import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { ThirdScreen } from 'pages/third'
// import WorkerProfilePage from 'pages/worker/WorkerProfilePage'

function Third() {
  const { path } = useRouteMatch()
  
  return (
    <Switch>
      <Route exact path={path} component={ThirdScreen} />
      {/* <Route path={`${path}/:id`} component={WorkerProfilePage} /> */}
    </Switch>
  )
}

export default Third
