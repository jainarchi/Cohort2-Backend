import { useContext } from "react";
import { SongContext } from "../context/SongContext";
import { allSongs, moodSongs, getlatestSongs } from "../services/song.service";

export const useSongs = () => {
  const {
    songs,
    setSongs,
    loading,
    setLoading,
    favoriteSongs,
    setFavoriteSongs,
    latestSongs,
    setLatestSongs,
    recentPlay,
    setRecentPlay,
    moodSongs,
    setMoodSongs
  } = useContext(SongContext);




  const handleAllSongs = async () => {
    setLoading(true);
    const data = await allSongs();
    setSongs(data.allSongs);
    setLoading(false);
  }



  const handleMoodSongs = async (mood) => {
    setLoading(true);
    const data = await moodSongs(mood);
    console.log(data.message)
    setMoodSongs(data.moodSongs )
    setLoading(false);
  }




  const handleLatestSongs = async () => {
    setLoading(true);
    const data = await getlatestSongs();
    console.log(data.latestSongs);
    setLatestSongs(data.latestSongs)
    setLoading(false);
  }




  const handleRecentPlay = async () => {};




  const handleFavoriteSongs = async () => {};




  const handleCreateSong = async () => {};







  return {
    handleAllSongs,
    handleLatestSongs,
    handleMoodSongs,
    handleRecentPlay,
    handleFavoriteSongs,

    handleCreateSong,

    loading,
    songs,
    latestSongs,
    recentPlay,
    favoriteSongs,
  };
};
