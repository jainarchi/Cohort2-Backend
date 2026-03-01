import {getIncomingRequest , getSentPendingRequest , getAllConnections} from '../services/connection.api'
import { useContext } from 'react'
import {ConnectionContext} from '../ConnectionContext' 

export const useConnection = () =>{
  const {loading , setLoading , setIncomingReq , incomingReq , sentReq , setSentReq , setAllConnections , allConnections} = useContext(ConnectionContext)

   
  const handleGetIncomingRequest = async () =>{
    setLoading(true);

    const data = await getIncomingRequest()
    setIncomingReq(data)
    console.log(data)
      
    setLoading(false)
  }


  const handlegetSentPendingRequest = async () =>{
      setLoading(true)
      const data = await getSentPendingRequest();
      setSentReq(data)
      console.log(data)
      setLoading(false)

  }

  const handleGetAllConnections = async () =>{
    setLoading(true)
    const data = await getAllConnections()
    setAllConnections(data)
    setLoading(false)
  }



  return{
    handleGetIncomingRequest,
    handlegetSentPendingRequest,
    handleGetAllConnections,
    loading,
    incomingReq,
    sentReq,
    allConnections

  }


}