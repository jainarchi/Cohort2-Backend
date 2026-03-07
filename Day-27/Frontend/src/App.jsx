import React from 'react'
import { RouterProvider } from 'react-router-dom'
import {router} from './appRouter'
import "./features/shared/style/global.scss"
import "./features/shared/style/button.scss"
import { AuthProvider } from './features/auth/authContext'

const App = () => {
  return (
    <div>


    <AuthProvider>
      
      <RouterProvider  router={router} />

    </AuthProvider>
      
    </div>
  )
}

export default App
