import { BrowserRouter } from 'react-router-dom'

import { useAuthContext } from '../contexts/authContext'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'


export function Routes(){

  const { user, loadingAuth } = useAuthContext()

  if(loadingAuth){
    return
  }

  return(
    <BrowserRouter>

      { user ? <AppRoutes /> : <AuthRoutes /> }

    </BrowserRouter>
  )
}