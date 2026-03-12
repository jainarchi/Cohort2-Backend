import { useEffect } from "react";
import SongCardLarge from "../components/songCards/SongCardLarge";
import { useSongs } from "../hooks/UseSong";
import '../style/songCard.scss'

const AllSongs = () => {
  const { handleAllSongs, loading, songs } = useSongs();

   const fetchSongs = async () => {
      try {
        await handleAllSongs();
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    }

  useEffect(() => {
      fetchSongs();
  }, []);




  if (loading || !songs) {
    return (
      <main>
        <p>loading...</p>
      </main>
    );
  }



  return (
    <div className="songCard-container">


     {
        songs.length == 0 
        ?(
            <>
            <h2>No Song Found</h2>
            </>
        ) 
        : (
            <>
            {
                songs.map((s) =>(
                  <SongCardLarge  
                  key={s._id}
                  id={s._id}
                  artist={s.artist}
                  title={s.title}
                  album={s.album}
                  songUrl={s.songUrl}
                  posterUrl={s.posterUrl}
                  />
                ))
            }

            
            </>
        )

     }
    
    </div>
  );
};

export default AllSongs;
