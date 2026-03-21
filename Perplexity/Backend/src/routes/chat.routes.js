import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {messageController , getChats , getMessages, editChatTitle , deleteChat} from '../controllers/chat.controllers.js'


const router = Router()


/**
 * @desc 
 * @route /api/chats/message
 * @access private
 */
router.post('/message', authUser , messageController )


/**
 * @desc 
 * @route /api/chats
 * @access private
 */
router.get('/' , authUser , getChats)


/**
 * @desc 
 * @route /api/chats/:chatId/messages
 * @access private
 */
router.get('/:chatId/messages' , authUser , getMessages)




/** 
 * @route DELETE  /api/chats/:chatId
 * @desc delete the user's chat
*/

router.delete('/:chatId', authUser , deleteChat)



/** 
 * @route PATCH /pai/chats/:chatId/edit-title
 * @desc edit chat title
*/
router.patch('/:chatId/edit-title' , authUser , editChatTitle )





export default router