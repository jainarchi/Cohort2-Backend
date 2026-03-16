import axios from "axios"


const api = axios.create({
    baseURL: "http://localhost:3000/api/posts",
    withCredentials: true
})



export async function getFeed() {
     const response = await api.get('/feed')
       return response.data
} 
   
export async function createPost(ImageFile , caption){

    const formData = new FormData()

    formData.append("postImage" , ImageFile )
    formData.append("caption" , caption )
    
    const response = await api.post('/' , formData )
    
    return response.data

}


export async function likePost(postId) {
    const res = await api.post('/like/' + postId )
    console.log(res.data.message)

}


export async function unlikePost(postId) {
   const res = await api.delete('/unlike/' + postId )   
   console.log(res.data.message)

}