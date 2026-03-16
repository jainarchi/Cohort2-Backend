import 'dotenv/config'
import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage , tool , createAgent} from 'langchain';
import {sendEmail} from './services/mail.service.js'
import * as z from "zod" 



const rl = readline.createInterface({
  input: stdin,
  output: stdout
})

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY
})

// provide tool name and desp for ai

const emailTool = tool(
    sendEmail,
  {
    name: "emailTool",                 
    description: "tool is used to send an email",
    schema: z.object({
        to: z.string().describe("The recipient's email address"),
        html: z.string().describe("The HTML content of the email"),
        subject: z.string().describe("The subject of the email"),
    }),
  }
);


const agent = createAgent({
    model,
    tools:[emailTool]
})


const messages = []


while(true) {

    const userInput = await rl.question('You : ')

    messages.push(new HumanMessage(userInput))

    const response = await agent.invoke({messages}) // agent take an obj


    messages.push(response.messages[ response.messages.length - 1 ])


    console.log(`\x1b[34m[AI]\x1b[0m ${response.messages[ response.messages.length - 1 ].content}`)

} 