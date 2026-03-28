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
  addMessages,
  delete_Chat,
  updateChatTitle,

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

      dispatch(setCurrentChatId(chatId || chat._id ))
       dispatch(setLoading(false));
    
    
    
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

             console.log(acc)
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



    const handleDeleteChat = async (chatId) => {
      const data = await deleteChat({chatId})
      console.log(data.message)
      dispatch(delete_Chat(chatId))
      
      
    }

    const handleEditTitle = async (chatId , newTitle) =>{
      const data  = await editChatTitle({chatId , newTitle})
      dispatch(updateChatTitle({chatId , newTitle}))
      console.log(data.message)
    }

   

    const handleNewChat = () =>{
      dispatch(setCurrentChatId(null))

    }




  return {
    initializationSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleDeleteChat,
    handleEditTitle,
    handleNewChat,
   
  }
}
