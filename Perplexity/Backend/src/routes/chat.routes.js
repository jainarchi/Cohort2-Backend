import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import {sendMessage , getChats , getMessages, editChatTitle , deleteChat} from '../controllers/chat.controllers.js'


const router = Router()


/**
 * @desc create new chat or folow up messages
 * @route POST /api/chats/message
 * @access private
 */
router.post('/message', authUser , sendMessage )


/**
 * @route GET /api/chats
 * @desc  get all chats (title , user)
 * @access private
 */
router.get('/' , authUser , getChats)


/**
 * @route GET /api/chats/:chatId/messages
 * @desc fetch message of chat
 * @access private
 */
router.get('/:chatId/messages' , authUser , getMessages)




/** 
 * @route DELETE  /api/chats/:chatId
 * @desc delete the user's chat
 * @access private
*/

router.delete('/:chatId', authUser , deleteChat)



/** 
 * @route PATCH /pai/chats/:chatId/edit-title
 * @desc edit chat title
 * @access private
*/
router.patch('/:chatId/edit-title' , authUser , editChatTitle )





export default router