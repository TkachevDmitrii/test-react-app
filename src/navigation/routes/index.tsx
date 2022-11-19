import { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SignIn from 'pages/SignIn'
import { MainLayout } from 'layouts'

const Home = lazy(() => import('./home'))

const getAuthorized = () =>
  Boolean(localStorage.getItem('accessToken')) 

function Routing() {
  const [authorized, setAuthorized] = useState(true)

  useEffect(() => {
    addEventListener('storage', () => {
      setAuthorized(getAuthorized())
    })

  }, [getAuthorized])
  
  if (!authorized) return (
    <Suspense fallback={<></>}>
      <Switch>
        <Route path='/complete-registration' component={SignIn} />
        <Route component={SignIn} />
      </Switch>
    </Suspense>  
  )

  return (
    <MainLayout>
      <Suspense fallback={<></>}>
        <Switch>
          <Redirect exact path='/' to='/main' />
          <Route path='/main' component={Home} />
        </Switch>
      </Suspense>
    </MainLayout>
  )
}

export default Routing
