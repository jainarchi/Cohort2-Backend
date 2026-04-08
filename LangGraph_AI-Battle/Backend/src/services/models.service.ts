import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere"
import config from "../config/config.js";



const geminiModel = new ChatGoogle({
    model : "gemini-flash-latest",
    apiKey : config.GEMINI_API_KEY
});



const mistalModel = new ChatMistralAI({
    model : "mistal-medium-latest",
    apiKey : config.MISTAL_API_KEY
})



const cohereModel = new ChatCohere({
    model : "command-a-03-2025",
    apiKey : config.COHERE_API_KEY
})