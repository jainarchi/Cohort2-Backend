import axios from "axios";


const api = axios.create({
    baseURL:'http://localhost:3000/api/connection',
    withCredentials : true
})


export async function getIncomingRequest(){
   const respone = await api.get('/request/pending');
   return respone.data.pendingRequests

}


// export async function (params) {
    
// }

