import 'dotenv/config'
import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage , tool , createAgent} from 'langchain';
import { tavily } from "@tavily/core";
import {sendEmail} from './services/mail.service.js'
import * as z from "zod" 



const model = new ChatMistralAI({
    model: "mistral-small-latest"
});

const tvly = tavily({ 
  apiKey: process.env.TAVILY_API_KEY

})




const rl = readline.createInterface({
  input: stdin,
  output: stdout
})





// provide tool name and desp for ai understanding

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


const searchTool = tool(
  async ({ query }) => {
    const res = await tvly.search(query);
    return res.results
      .slice(0, 3)
      .map(r => r.content)
      .join("\n\n");
  },
  {
    name: "search_web",
    description: "Use this tool to get real-time and latest information from the internet",
    schema: z.object({
      query: z.string().describe("The search query to look up")
    })
  }
);




const agent = createAgent({
    model,
    tools:[emailTool , searchTool]
})


const messages = []


while(true) {

    const userInput = await rl.question('[You] : ')

    messages.push(new HumanMessage(userInput))

    const response = await agent.invoke({messages})    // agent take an obj

    messages.push(response.messages[ response.messages.length - 1 ])


    console.log(`\x1b[34m[AI]\x1b[0m : ${response.messages[ response.messages.length - 1 ].content}`)

} 