import {createSlice } from '@reduxjs/toolkit'


const userPromptSlice = createSlice({
    name: 'userPrompt',
    initialState: {
        selectPrompt: null,
        savedPrompts : []
        
    },

    reducers:{
        
    setSelectPrompt:(state , action) =>{
      state.selectPrompt = action.payload;
    },
    
    clearSelectPrompt:(state)=>{
      state.selectPrompt = null
    },

    setSavedPrompts :(state , action) =>{
      state.savedPrompts = action.payload
    },


    deleteSavedPrompt:(state , action) =>{
      const {promptId} = action.payload
      state.savedPrompts = state.savedPrompts.filter(prompt => prompt.id != promptId)
    },
     

    addOneSavedPrompt:(state , action) =>{
      state.savedPrompts.unshift(action.payload)
    },


    }
})

export const {
  setSelectPrompt,
  clearSelectPrompt,

  setSavedPrompts,
  deleteSavedPrompt,
  addOneSavedPrompt
  
} = userPromptSlice.actions


export default userPromptSlice.reducer

    