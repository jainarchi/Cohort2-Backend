const { Router } = require('express')
const upload = require('../middlewares/upload.middleware')
const songControllers = require('../controllers/song.controller')
const {authUser} = require('../middlewares/auth.middleware')


const router =  Router()




/**
 * @route POST api/songs?mood=sad
 * @description user can upload song 
 */

router.post('/' , upload.single('song') ,  songControllers.uploadSong )


/**
 * @route GET api/songs
 * @description get all songs
 */

router.get('/' , songControllers.getAllSongs)



/**
 * @route GET api/songs/mood?mood=happy
 * @description  get songs based on mood & one random song for play
 */

router.get('/mood' , songControllers.getMoodSongs)



/**
 * @route GET api/songs/latest
 * @description fetch latest 5 songs which added recently 
 */

router.get('/latest' , songControllers.latestSongs)






module.exports = router
