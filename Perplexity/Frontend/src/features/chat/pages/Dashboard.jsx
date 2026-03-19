import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hook/useChat'




const Dashboard = () => {
  const chat = useChat()
    
  const { user } = useSelector(state => state.auth)
  console.log(user)


  useEffect(() => {
    chat.initializationSocketConnection()
    
  }, [])
  


 

  return (
    <div>
      Dashboard
      
    </div>
  )
}

export default Dashboard
