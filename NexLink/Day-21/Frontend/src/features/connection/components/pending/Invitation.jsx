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
            incomingReq.length === 0 ? (
               <>
                 <p className="message">No Incoming request</p>
               </>
            ):(
               
               incomingReq.map((r) =>{
                return (
                <InvitationCard 
                 key={r._id} 
                 user={r.requestedBy} 
                 createdAt={r.createdAt} 
                 />
                )
               })
            )
         }
         
      

         
        
      </div>
  )
}

export default Invitation
