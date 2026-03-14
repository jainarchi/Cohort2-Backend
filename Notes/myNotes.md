package.json - contains all package we install for our project 

package-lock.json - contains all dependences ie our package depends on further packages 

node-module - all i packages present inside this.


 API
- REST API - transfer data in JSON
- partial update in note - patch api
- delete - replace with null 


Data send from frontend -
- params : very small data
- body : large data


# Database Servers
MongoDB Atlas - Cloud
- cluster = storage + processor
- Add 2 layer of security 

connect compass with cluster
connect Server with Database 


mongoose.connect( URI )  connect with db
db create only after document insert 


CLUSTER -> DB -> Collections -> Document(BSON / Binary JSON format)

// DB 
schema - describe doc format in collection

find() read all & always return arr of obj
model ignore extra field req to save in db
config()  - load variables



// day - 8
## Axios 
- axios - used to call api
- axios.method(api url , {if send any data})
- cors policy implemented on browser


day - 9 
## frontend-backend Integration
- npm run build -> dist folder 
- whole react code convert into 3 files 
- then move into backend inside public folder 


- app.get('*name' , callback) // wild card api 
- send index.html file
- problem - inside index.html call for JS and CSS but our server is not programmed for that result it will call wild card api - give index file 


- use middleware express.static(./dist)
- if file exists inside dist then it will send from this
- express.static can make any folder publically available

or move dist folder

-----------------------------

Day- 10 Integrations and Deployment


## Four Pillars of Auth

- Authentication – verifies a user’s identity (by token)

- Authorization – defines what privileges a user has

- Validation – checks whether data is in the correct format

- Verification – confirms that the information is correct and authentic


----------------
Day-11
## JWT (JSON Web Token)

- JSON Web Token is used to create tokens using .sign()
- Every application has a different JWT secret key
- JWT is commonly used for authentication and authorization

## Cookie Parser

- cookie-parser is a middleware
- The server has direct access to cookie storage
- The server stores the token in cookies (not in the database) using res.cookie()
- No need to send the token manually with each request; the server reads it directly from cookies

## Important Note

#### Tokens are visible in the browser, so never store sensitive information in them

#### Use only a user ID (or minimal data) when creating a token

------------------------

Day-12
# Hashing
- one way process
- convert plain text into well calculated hashed text
- same inp - same output
- crypto ( express in-built package )
- md5 , sha256
- bcryptjs , argon2

-------------
Day-13 Practice + cookie flags


## Integration 
### cors origin set on server but enforced by browser
- every req process in server by def, give res
- browser check allow access origin 
- if allowed then allowed JS to read a response


##  learning from Insta Clone 
- .toString() always safe | campare Object Id and string Id
- == do type corresion



----------------------------------------------
## REMEMBER

### Idompotent 
- on multiple req server state not change same as the result of once

- An operation is idempotent if performing it multiple times produces the same result as performing it once. 

- For example, DELETE is idempotent because deleting a resource multiple times still results in the resource not existing.

- eg like unlike Delete req - 
    - if present then delete if not no change 
    - for both ok status 
    - no need to add 409 unnecessary err status

- POST change state 



- mongodb return mongoose Object - can't add new property
- convert it into normal js object using   .lean()
 


###   duplicate key err from collection 
 -  race condition
 -  sol - add unique combniaton in coll Schema
 -  if err form coll - handle in controller                    



## Auth0 vs Manual Difference

| Feature                  | Manual Google OAuth | Auth0      |
| ------------------------ | ------------------- | ---------- |
| JWT generate             | Tumhara server      | Auth0      |
| Key manage               | Tum                 | Auth0      |
| Multiple login providers | Hard                | Easy       |
| Security handling        | Manual              | Built-in   |
| Learning value           | High                | Fast setup |


### flow

Architecture Difference

- on login btn redirect to google page then some details google send to backend backend create token 

    - User → Google → Backend → JWT generate → Frontend

-  Auth0 Flow: auth0 server generate token using private key and backend verify it using public key of auth0

    - User → Auth0 → JWT generate → Frontend → Backend verify

-----

Day: 25-27  | Moodify 
## Token BlackListing

### why it needed?
### Blacklisted token add in Redis not in Mongodb but why ?


// Day - 30 |  err handling , validation
- Express Validator 
- err handling by middleware



// Day- 31  socket io 
