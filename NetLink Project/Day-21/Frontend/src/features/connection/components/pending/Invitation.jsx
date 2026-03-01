import { useEffect } from "react"
import InvitationCard from "../cards/InvitationCard"
import {useConnection} from '../../hook/useConnection'





const Invitation = () => {
   const {loading , incomingReq , handleGetIncomingRequest } = useConnection()
   

    useEffect(() => {
      handleGetIncomingRequest()

    
    }, [])




   if(loading || !incomingReq){
    return( <main>
       Loading...
    </main>
   )
  }

  return (
     <div className="cardCont">

         {
          incomingReq.map((r) =>{
                return (
                <InvitationCard 
                 key={r._id} 
                 requestedBy={r.requestedBy} 
                 createdAt={r.createdAt} 
                 
                 />
                )
          })
         }
        
      </div>
  )
}

export default Invitation
