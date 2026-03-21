import { initializationSocketConnection } from "../service/chat.socket";
import {sendMessage , getChats , getMessages , deleteChat , editChatTitle} from '../service/chat.api'
import {setChats , setCurrentChatId , setLoading , setError , createNewChat , addNewMessage} from '../chat.slice'
import { useDispatch } from "react-redux";



export const useChat = () =>{
    const dispatch = useDispatch()


    const handleSendMessage = async ({message , chatId}) =>{
        const data = await sendMessage({message , chatId})
        

    }












    
    return {
        initializationSocketConnection
    }
}