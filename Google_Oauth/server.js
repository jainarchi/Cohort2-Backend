import dotenv from 'dotenv'
import express from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'


dotenv.config()
const app = express()



app.get('/home' , (req , res) => {
    res.send('Home page ')
})


app.use(passport.initialize())


passport.use( new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (_ , __ , profile , done) => {
    console.log(profile)
    done(null , profile)
}))



//client redirect to google
app.get('/auth/google' , (req , res) =>{
   passport.authenticate('google' , {scope : ['email' , 'profile']})
})



// redirect url from google after user allow permission
// google give authcode to client - client send authcode to server
// server exchange authcode to access user info with google

app.get('/auth/google/callback' , (req , res) =>{
    passport.authenticate('google' , {
        session : false,
        failureRedirect: '/'
    }),(req , res) =>{
        console.log(req.user)
        res.send('user authenticated successfully')
    }
})







app.listen(8000 , () =>{
    console.log('Server listen on port 8000')
})





// passport: Authentication middleware.
// passport-google-oauth20: Google OAuth 2.0 strategy for Passport.