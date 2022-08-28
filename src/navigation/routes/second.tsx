import { SelectOutlined } from '@ant-design/icons'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { SecondScreen } from 'pages/second'
// import WorkerProfilePage from 'pages/worker/WorkerProfilePage'

function Second() {
  const { path } = useRouteMatch()
  
  return (
    <Switch>
      <Route exact path={path} component={SecondScreen} />
      {/* <Route path={`${path}/:id`} component={WorkerProfilePage} /> */}
    </Switch>
  )
}

export default Second
