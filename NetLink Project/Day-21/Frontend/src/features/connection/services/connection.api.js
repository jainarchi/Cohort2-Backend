import axios from "axios";


const api = axios.create({
    baseURL:'http://localhost:3000/api/connection',
    withCredentials : true
})



export async function getAllConnections() {
   const response = await api.get('/')
   return response.data.connections
    
}

export async function getIncomingRequest(){
   const respone = await api.get('/request/pending');
   return respone.data.pendingRequests

}


export async function getSentPendingRequest () {
    const response = await api.get('/request/sent')
    return response.data.sentUsers
    
}


// export async function sentConnectionRequest(id) {
//     const response = await api.post('/request/' , id);
//     return response.data.message
// }


// export async function withdraw( reqId) {
//     const response = await api.delete('/request/withdraw/' , reqId)
//     return response.data.message
    
// }

// export async function reject(reqId) {
//     const response = await api.patch('/request/reject/' , reqId)
//     return response.data.message
// }

// export async function accept(reqId) {
//     const response = await api.patch('/request/accept' , reqId)
//     return response.data.message 
// }