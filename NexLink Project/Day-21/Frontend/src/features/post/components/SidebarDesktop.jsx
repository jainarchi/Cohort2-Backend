import { Link } from 'react-router-dom'
import '../style/SidebarDesktop.scss'
import {RiHome4Line , RiUserLine , RiStickyNoteAddLine} from "@remixicon/react";

const SidebarDesktop = () => {
  return (
    <div>

        <div className="sidebar">
            
                <h4><Link to="/feed"> <RiHome4Line />Home</Link></h4>
                <h4><Link to="/explore" >Explore</Link></h4>
                <h4><Link to="/connection">Connections</Link></h4>
                <h4><Link to="/connection/pending/invitation"  >Pending Req</Link></h4>
                <h4><Link to='/profile'> <RiUserLine />Profile</Link></h4>
                <h4><Link  to='/create-post'  ><RiStickyNoteAddLine />Create Post</Link></h4>
            
        </div>
      
    </div>
  )
}

export default SidebarDesktop
