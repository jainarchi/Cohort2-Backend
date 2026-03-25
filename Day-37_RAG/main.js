 import "dotenv/config"
 import { PDFParse } from 'pdf-parse';
 import fs from 'fs'
 import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
 import { MistralAIEmbeddings } from "@langchain/mistralai";
 import { Pinecone } from '@pinecone-database/pinecone';



 const pc = new Pinecone({
  apiKey:process.env.PINECONE_API_KEY
 })
 const index = pc.index('cohort-rag');





 const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey: process.env.MISTRAL_API_KEY
 });


 
//  const buffer = fs.readFileSync('./Wrapper_class_reader.pdf')

//  const parser = new PDFParse({
//     data : buffer 
//  })

//  const data = await parser.getText()
//  console.log(data) 





//  const splitter = new RecursiveCharacterTextSplitter({
//      chunkSize: 500, 
//      chunkOverlap: 0 
    
//  })
//  const chunks = await splitter.splitText(data.text)
//  console.log(chunks , chunks.length)




//  const docs = await embeddings.embedDocuments(chunks)

 
// const docs = await Promise.all(chunks.map( async (chunk) =>{

//     const embadding = await embeddings.embedQuery(chunk)
//     return {
//         text : chunk,
//         embadding
//     }
// }))


// console.log(docs)



// insert embadding into Vector DB 


// const result = await index.upsert({

//     records : docs.map((doc , i) =>({
//         id : `doc-${i}`,
//         values : doc.embadding,
//         metadata : {
//             text : doc.text
//         }
//     }))
// })


// user query


const queryEmbadding = await embeddings.embedQuery('explain the method of buffer reader')


const result = await index.query({
    vector: queryEmbadding,
    topK: 2,
    includeMetadata: true,
});



console.log(JSON.stringify(result))