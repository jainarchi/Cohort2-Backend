import {config} from 'dotenv'
config()



type CONFIG = {
    readonly GEMINI_API_KEY:string,
    readonly MISTAL_API_KEY:string,
    readonly COHERE_API_KEY:string
}


const config : CONFIG = {
   GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
   MISTAL_API_KEY: process.env.MISTAL_API_KEY || "",
   COHERE_API_KEY: process.env.COHERE_API_KEY || ""
}


export default config
