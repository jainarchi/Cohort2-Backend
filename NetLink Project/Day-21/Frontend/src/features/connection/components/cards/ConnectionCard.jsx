

const ConnectionCard = ({btn}) => {
  return (
     <div className="card">
            <div className="left">

                <img src="" alt="" />

                 <div >
                    <h4>Username</h4>
                    <p>Full stack developer</p>

                    <span>1 week ago</span>
                 </div>

            </div>

           

            <button className='btn'>{btn}</button>
           

           
        </div>
      
  )
}

export default ConnectionCard
