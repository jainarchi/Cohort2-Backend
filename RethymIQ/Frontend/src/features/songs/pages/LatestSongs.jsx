import React, { useEffect } from "react";
import "../style/songCard.scss";
import { useSongs } from "../hooks/UseSong";
import SongCardLarge from "../components/songCards/SongCardLarge";




const LatestSongs = () => {
  const { handleLatestSongs, loading, latestSongs } = useSongs();

  const fetchLatestSong = async () =>{
    try{
      await handleLatestSongs()
    }
      catch (error) {
        console.error("Error fetching songs:", error);
      }
  }


  useEffect(() =>{
     fetchLatestSong()

  } , [])


  if( loading || ! latestSongs){
    return (
      <main>
        <p>loading...</p>
      </main>
    )
  }




  return (
    <div className="latest-song-page">
      <div className="head">

      <h1>Latest Songs</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

      </div>


      <div className="songCard-container">
   

        {
          latestSongs.map((s) =>(
            <SongCardLarge 

            key={s._id}
            id={s._id}
            title={s.title}
            artist={s.artist}
            album={s.album}
            posterUrl={s.posterUrl}
            songUrl={s.songUrl}


             />
          ))
        }


      </div>


    </div>
  );
};

export default LatestSongs;
