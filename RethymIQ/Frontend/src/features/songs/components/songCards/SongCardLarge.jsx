import { RiHeart3Line  , RiMore2Fill } from '@remixicon/react';


const SongCardLarge = ({  id , artist , title , album , songUrl , posterUrl}) => {
  return (
  
    <div className="largeSongCard" id={id}>

      <div className="image-container">
        <img src={posterUrl} alt='poster' />
      </div>
      
      <div className="song-info">
        <h3 className="song-title">{title}</h3>
        <p className="artist-name">{artist}</p>
      </div>

      <div className='more-btn'>
        <RiHeart3Line 
            size={18}  className='icon'
            // color={isFavorite ? '#00f2ff' : '#ffffff'} // Green/Cyan if active, else White
          />

          <RiMore2Fill size={16} className='icon' />
      </div>


    </div>

  )
}

export default SongCardLarge
