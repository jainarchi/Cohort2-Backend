import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import chatControllers from "../controllers/chat.controllers.js";

const router = Router()


/**
 * @desc 
 * @route /api/chats/message
 * @access private
 */

router.post('/message', authUser , chatControllers.messageController )



export default router