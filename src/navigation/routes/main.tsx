import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Main } from 'pages/main'
// import WorkerProfilePage from 'pages/worker/WorkerProfilePage'

function Workers() {
  const { path } = useRouteMatch()
  
  return (
    <Switch>
      <Route exact path={path} component={Main} />
      {/* <Route path={`${path}/:id`} component={WorkerProfilePage} /> */}
    </Switch>
  )
}

export default Workers
