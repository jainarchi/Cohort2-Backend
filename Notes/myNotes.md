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
- crypto

