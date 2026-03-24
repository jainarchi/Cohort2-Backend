 
 import "dotenv/config"
 import { PDFParse } from 'pdf-parse';
 import fs from 'fs'
 import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
 import { MistralAIEmbeddings } from "@langchain/mistralai";



 const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey: process.env.MISTRAL_API_KEY
 });


 
 const buffer = fs.readFileSync('./Wrapper_class_reader.pdf')

 const parser = new PDFParse({
    data : buffer 
 })

 const data = await parser.getText()
//  console.log(data) 





 const splitter = new RecursiveCharacterTextSplitter({
     chunkSize: 500, 
     chunkOverlap: 0 
    
 })
 const chunks = await splitter.splitText(data.text)
 console.log(chunks , chunks.length)




//  const docs = await embeddings.embedDocuments(chunks)

 
const docs = await Promise.all(chunks.map( async (chunk) =>{

    const embadding = await embeddings.embedQuery(chunk)
    return {
        text : chunk,
        embadding
    }
}))


console.log(docs)




