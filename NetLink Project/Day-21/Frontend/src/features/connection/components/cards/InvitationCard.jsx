

const InvitationCard = ({requestedBy , createdAt}) => {
  return (
  

          <div className="inviteCard">

            <div className="left">

                <img src={requestedBy.profileImage} alt="" />

                 <div >
                    <h4>{requestedBy.username}</h4>
                    <p>Bio</p>

                    <span>{createdAt}</span>
                 </div>

            </div>

           
           <div className='BtnCont'>
             <button className='acceptBtn'>Accept</button>
             <button className='ignoreBtn'>Ignore</button>

           </div>
           


           
        </div>
      
    
  )
}

export default InvitationCard
