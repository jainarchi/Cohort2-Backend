async function registerUser (req , res , next) {
    try{
       throw new Error('user already found.')  
    }
    catch(err){
        err.status=409
        next(err)

    }
    
}

// in-built express err-handler show err in HTML format 



async function loginUser(req , res , next) {

    try{
      throw new error('logi err throwww')

    }
    catch(err){
        err.status=401
        err.message="err occur while user logging"
        next(err)
    }
}


export default{
    registerUser,
    loginUser
}