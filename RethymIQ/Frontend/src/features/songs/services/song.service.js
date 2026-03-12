import axios from 'axios'


const api = axios.create({
    baseURL:'http://localhost:3000/api/songs',
    withCredentials: true
})


export async function allSongs(){
   const response = await api.get('/')
   return response.data
   
}

export async function moodSongs(mood) {
    const response = await api.get('/mood?mood=' + mood)
    return response.data
}


export async function getlatestSongs() {
    const response = await api.get('/latest')
    return response.data
}


// create   favorite    recent play 