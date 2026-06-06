import { RouterProvider } from 'react-router-dom'

import router from './app.routes'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hook/useAuth'


const App = () => {
  const {handleGetMe} = useAuth()
  useEffect(() => {
    handleGetMe()
  }, [])
  return (
    
    <RouterProvider router={router} />
  
  )
}

export default App