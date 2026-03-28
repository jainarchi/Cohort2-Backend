import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/auth.slice'
import chatReducer from '../features/chat/chat.slice'
import userPromptReducer from '../features/chat/userPrompt.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    userPrompt: userPromptReducer
   
  }
})