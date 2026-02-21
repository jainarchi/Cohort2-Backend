import axios from 'axios'


const api = axios.create({
    BaseURL: 'http://localhost:3000/api/auth',
    withCredentials : true
})


export async function register(username ,email , password) {
    const response = await api.post('/register' , {
        username, email, password
    })

    return response.data  
}



export async function login(username , password) {
    const response = await api.post('/login' , {
        username , password
    })

    return response.data
}



export async function get_me() {
    const response = api.get('/get-me')

    return response.data
}
