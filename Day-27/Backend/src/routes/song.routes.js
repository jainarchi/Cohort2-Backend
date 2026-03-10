const { Router } = require('express')
const upload = require('../middlewares/upload.middleware')
const songControllers = require('../controllers/song.controller')



const songRouter =  Router()




/**
 * @route POST api/songs/
 * @description user can upload song 
 */

songRouter.post('/api/songs' , upload.single('song') ,  songControllers.uploadSong )


