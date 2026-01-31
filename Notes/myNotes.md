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
axios - used to call api
cors policy implemented on browser
