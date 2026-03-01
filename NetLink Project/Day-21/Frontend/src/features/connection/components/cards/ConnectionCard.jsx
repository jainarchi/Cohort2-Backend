

const ConnectionCard = ({ user , createdAt , btn}) => {
  return (
     <div className="card">
            <div className="left">

                <img src={user.profileImage} alt="" />

                 <div >
                    <h4>{user.username}</h4>
                    <p>Bio</p>

                    <span>{createdAt}</span>
                 </div>

            </div>

           

            <button className='btn'>{btn}</button>
           

           
        </div>
      
  )
}

export default ConnectionCard
