import '../../style/connectionList.scss'
import ConnectionCard from '../cards/ConnectionCard'
import { useConnection } from '../../hook/useConnection'
import { useEffect } from 'react'


const Connections = () => {

 const {handleGetAllConnections , allConnections , loading} = useConnection() 

  useEffect(() => {
    handleGetAllConnections()
  
  }, [])
  
  if(loading || !allConnections){
    return (<>
       Loading...
    </>
  )}


  return (

      <div className="ConnectionsList">

        <div className="head">
          <h5>YOUR CONNECTIONS</h5>
        </div>



        <div className="cardCont">

          { allConnections.length === 0 ?(
            <>
            <p className='message'>No connection yet. <br /> sent request, grow your connection.</p>
            </>
          ):(

            allConnections.map((r) =>{
              return (
                   
                <ConnectionCard   
                 key={r.id}
                 user={r.connectWith}
                 createdAt={r.createdAt}
                 btn="Remove"
                 />
              )
            })
          )
        }
        
        
       
       </div>
       
       


      </div>


  )
}

export default Connections
