import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { HomePage } from 'pages/HomePage'
// import WorkerProfilePage from 'pages/worker/WorkerProfilePage'

const Home = () => {
  const { path } = useRouteMatch()
  
  return (
    <Switch>
      <Route exact path={path} component={HomePage} />
      {/* <Route path={`${path}/:id`} component={WorkerProfilePage} /> */}
    </Switch>
  )
}

export default Home
