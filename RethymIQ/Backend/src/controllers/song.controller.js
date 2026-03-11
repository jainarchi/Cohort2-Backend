const songModel = require("../models/song.model");
const nodeId3 = require("node-id3");
const storageService = require("../services/storage.service");

async function uploadSong(req, res) {
  const fileBuffer = req.file.buffer;
  const { mood } = req.query;

  const tags = nodeId3.read(fileBuffer);
  const imageBuffer = tags.image.imageBuffer;

  const songUrl = await storageService({
    buffer: fileBuffer,
    filename: tags.title + ".mp3",
    folder: "cohort2/RhythmIQ/songs",
  });

  const posterUrl = await storageService({
    buffer: imageBuffer,
    filename: tags.title + ".jpeg",
    folder: "cohort2/RhythmIQ/posters",
  });

  console.log(posterUrl);

  const newSong = await songModel.create({
    songUrl: songUrl.url,
    posterUrl: posterUrl.thumbnailUrl,
    title: tags.title,
    artist: tags.artist,
    album: tags.album,
    mood: mood,
  });

  res.status(201).json({
    message: "song created successfully",
    newSong,
  });
}




async function getMoodSongs(req, res) {

  const { mood } = req.query;

  const moodSongs = await songModel.find({ mood })

  let playSong = null


  if (moodSongs.length > 0) {
    const randomIndex = Math.floor(Math.random() * moodSongs.length);
    playSong = moodSongs[randomIndex];
  }

  res.status(200).json({
    message: "Songs fetched successfully.",
    moodSongs,
    playSong
  })

}




async function getAllSongs(req, res) {
  const allSongs = await songModel.find();

  res.status(200).json({
    message: "All songs fetch successfully",
    allSongs,
  });
}




async function latestSongs(req, res) {
  const latestfive = await songModel.find().sort({ createdAt: -1 }).limit(5);

  res.status(200).json({
    message: "latest songs fetched successfully",
    latestfive,
  });
}




module.exports = {
  uploadSong,
  getMoodSongs,
  getAllSongs,
  latestSongs,
};
