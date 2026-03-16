import "dotenv/config"
import { ChatMistralAI } from "@langchain/mistralai";
import readline from "readline/promises";
import { HumanMessage } from "langchain";


const rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout
})


const model = new ChatMistralAI({
    model: "mistral-small-latest"
});

const message = []


while(true){
    const userInput = await rl.question('you: ')

    message.push(new HumanMessage(userInput))

    const response = await model.invoke(message)

    message.push(response)

    console.log(response.content)

    
}