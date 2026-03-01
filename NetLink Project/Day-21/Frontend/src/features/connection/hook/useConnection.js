import {getIncomingRequest} from '../services/connection.api'
import { useContext } from 'react'
import {ConnectionContext} from '../ConnectionContext' 

export const useConnection = () =>{
  const {loading , setLoading , setIncomingReq , incomingReq} = useContext(ConnectionContext)

   
  const handleGetIncomingRequest = async () =>{
    setLoading(true);

    const data = await getIncomingRequest()
    setIncomingReq(data)
    console.log(data)

      
    setLoading(false);
    
  }



  return{
    handleGetIncomingRequest,
    loading,
    incomingReq

  }


}