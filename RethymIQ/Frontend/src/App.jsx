import router from './AppRouter'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './features/auth/context/AuthContext'
import { SongContextProvider } from './features/songs/context/SongContext'
import './style/global.scss'

const App = () => {
  return (
    <div>
    
    <AuthProvider>
      <SongContextProvider>

         <RouterProvider router={router} />

      </SongContextProvider>

    </AuthProvider>
      
      
    </div>
  )
}

export default App
