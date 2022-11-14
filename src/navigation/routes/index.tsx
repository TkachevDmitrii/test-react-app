import { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SignIn from 'pages/SignIn'
import { MainLayout } from 'layouts'

const Main = lazy(() => import('./main'))
const SecondScreen = lazy(() => import('./second'))
const ThirdScreen = lazy(() => import('./third'))
const LearnLAyout = lazy(() => import('./learnLayout'))

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
          <Route path='/main' component={Main} />
          <Route path='/second' component={SecondScreen} />
          <Route path='/third' component={ThirdScreen} />
          <Route path='/LearnLAyout' component={LearnLAyout}/>
        </Switch>
      </Suspense>
    </MainLayout>
  )
}

export default Routing
