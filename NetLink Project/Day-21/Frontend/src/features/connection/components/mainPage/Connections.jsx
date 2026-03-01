import '../../style/connectionList.scss'
import ConnectionCard from '../cards/ConnectionCard'



const Connections = () => {
  return (
   

      <div className="ConnectionsList">

        <div className="head">
          <h5>YOUR CONNECTIONS</h5>
        </div>



        <div className="cardCont">
         
         <ConnectionCard btn="Remove"/>
        
       
       </div>
       
       


      </div>


  )
}

export default Connections
