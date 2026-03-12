import router from './AppRouter'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './features/auth/context/AuthContext'
import './style/global.scss'

const App = () => {
  return (
    <div>
    
    <AuthProvider>

      <RouterProvider router={router} />

    </AuthProvider>
      
      
    </div>
  )
}

export default App
