import { initializationSocketConnection } from "../service/chat.socket";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
  editChatTitle,
} from "../service/chat.api";
import {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  createNewChat,
  addNewMessage,
  addMessages
} from "../chat.slice";
import { useDispatch } from "react-redux";



export const useChat = () => {
  const dispatch = useDispatch();

  const handleSendMessage = async ({ message, chatId }) => {
    dispatch(setLoading(true));
    console.log('thinking...')

    const data = await sendMessage({ message, chatId });
    const { chat, aiMessage } = data;

    if (chat) {
      dispatch(createNewChat({
          chatId: chat._id,
          title: chat.title,
        }),
      )
    }
      dispatch(addNewMessage({
          chatId: chatId || chat._id,
          content: message,
          role: "user",
        })
      )

      dispatch(addNewMessage({
          chatId: chatId || chat._id ,
          content: aiMessage.content,
          role: aiMessage.role,
        })
      )

      dispatch(setCurrentChatId({chat : chatId || chat._id }))
    
    
    
    }



    const handleGetChats = async () =>{
        dispatch(setLoading(true))
        const data = await getChats()
        const {chats} = data
        

        dispatch(setChats(chats.reduce((acc , chat) =>{
            acc[chat._id] = {

                id : chat._id,
                title : chat.title,
                messages : [],
                lastUpdated : chat.updatedAt

            }
            return acc
           

          }, {})
       ))

       

       dispatch(setLoading(false))
    }


    async function handleOpenChat(chatId, chats) {

        if(chats[ chatId ]?.messages.length === 0){
            const data = await getMessages({chatId})
            const {messages} = data

            const formattedMessages = messages.map(msg =>({
                content : msg.content,
                role : msg.role
            }))


            dispatch(addMessages({
                chatId,
                messages : formattedMessages
            }))
        }

        dispatch(setCurrentChatId(chatId))
       
        
        
    }








  return {
    initializationSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat
  }
}
