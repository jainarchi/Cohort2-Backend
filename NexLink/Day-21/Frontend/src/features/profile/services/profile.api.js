import axios from "axios";


const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials: true
})

export async function getMe() {
    const response = await api.get('/auth/get-me')
    return response.data
    
}



// export async function getAbout() {
    
// }