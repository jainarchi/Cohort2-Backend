import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hook/useChat'
import '../style/dashboard.scss'
import {RiArrowUpLine} from '@remixicon/react'


const Dashboard = () => {
  const chat = useChat()
    
  const { user } = useSelector(state => state.auth)
  console.log(user)


  useEffect(() => {
    chat.initializationSocketConnection()
    
  }, [])
  


 

  return (
    <div className='dashboard'>






      <div className="input-box">
         <input type="text" 
         name="" 
         className='input'
         placeholder='ask your que...' />

         
         <div className='sendIcon'>
           <RiArrowUpLine size={'1.5rem'}/>
         </div>
       
      </div>
      

         

      
    </div>
  )
}

export default Dashboard
