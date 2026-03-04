import axios from "axios";


const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials: true
})



export async function getPosts() {
    const response = await api.get('/posts')
    return response.data.posts
}


export async function getPostDetails(postId) {
    const response = await api.get('/posts/' , postId)
    return response.data.post
}


export async function editPost(postId , caption) {
    const response = await api.patch(`/posts/${postId}` , {
        caption
    })
    return response.data.message
}



