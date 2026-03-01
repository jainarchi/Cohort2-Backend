import { Link } from 'react-router-dom'
import '../style/SidebarDesktop.scss'
import {RiHome4Line , RiUserLine , RiStickyNoteAddLine} from "@remixicon/react";

const SidebarDesktop = () => {
  return (
    <div>

        <div className="sidebar">
            
                <h4><Link> <RiHome4Line />Home</Link></h4>
                <h4><Link>Explore</Link></h4>
                <h4><Link>Connections</Link></h4>
                <h4><Link>Pending Req</Link></h4>
                <h4><Link> <RiUserLine />Profile</Link></h4>
                <h4><Link><RiStickyNoteAddLine />Create Post</Link></h4>
            
        </div>
      
    </div>
  )
}

export default SidebarDesktop
