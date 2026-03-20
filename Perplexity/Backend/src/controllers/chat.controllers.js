import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateResponse, generateTitle } from "../services/ai.service.js";

async function messageController(req, res) {
  const { message, chatId } = req.body;
  let title = null , chat = null

  if (!chatId) {
    title = await generateTitle(message);
    chat = await chatModel.create({
      user: req.user.id,
      title
    })
  }


  const userMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  })

 
  const allMessages = await messageModel.find({chat : chatId || chat._id})
  console.log(allMessages)

  const result = await generateResponse(allMessages);


  const aiMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: result,
    role: "ai",
  })


  res.status(201).json({
    title,
    userMessage,
    aiMessage,
  })
}





export default {
  messageController,
};
