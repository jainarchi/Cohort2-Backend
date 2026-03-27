import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    chats: {},
    currentChatId: null,
    selectPrompt: null,
    isLoading: false,
    error: null,
  },

  reducers: {
    createNewChat: (state, action) => {
      const { chatId, title } = action.payload;

      state.chats = {
        [chatId] :{
        id: chatId,
        title,
        messages: [],
        lastUpdated: new Date().toISOString()
      },

      ...state.chats

      }
    },

    setSelectPrompt:(state , action) =>{
      state.selectPrompt = action.payload;
    },
    
    clearSelectPrompt:(state)=>{
      state.selectPrompt = null
    },


    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;
      state.chats[chatId].messages.push({ content, role });
    },

    addMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.chats[chatId].messages.push(...messages);
    },

    setChats: (state, action) => {
      state.chats = action.payload;
    },

    updateChatTitle: (state , action) =>{
      const {chatId ,newTitle} = action.payload
      state.chats[chatId].title = newTitle
    },

    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
    delete_Chat: (state, action) => {
      const chatId = action.payload;

      delete state.chats[chatId];

      if (state.currentChatId === chatId) {
        const remaining = Object.keys(state.chats);
        state.currentChatId = remaining[0] || null;
      }
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
  createNewChat,
  addNewMessage,
  addMessages,
  delete_Chat,
  updateChatTitle,
  setSelectPrompt,
  clearSelectPrompt
} = chatSlice.actions;

export default chatSlice.reducer;









// chats = {
//     "docker and AWS": {               // chatId
//         messages: [
//             {
//                 role: "user",
//                 content: "What is docker?"
//             },
//             {
//                 role: "ai",
//                 content: "Docker is a platform that allows developers to..."
//             }
//         ],
//         id: "docker and AWS",
//         lastUpdated: "2024-06-20T12:34:56Z",
//     }
// }
