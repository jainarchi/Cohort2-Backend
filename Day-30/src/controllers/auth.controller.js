export async function registerUser (req , res , next) {

    try{
       throw new Error('user already found.')  
    
    }
    catch(err){
        err.status=409
        next(err)

    }
    
}

// in-built express err-handler show err in HTML format 


