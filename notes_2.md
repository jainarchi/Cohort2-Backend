# Node.js & Backend Basics — Cohort Notes
---

## How to Run JavaScript Outside the Browser
**Node.js allows us to run JavaScript directly on our computer**, without Chrome, without HTML, without React.

That means:

* JavaScript can create servers
* JavaScript can talk to databases
* JavaScript can run scripts
* JavaScript can power backend logic

---

### Technical Definition

Node.js is a **JavaScript runtime environment** that allows JavaScript to run outside the browser using the V8 engine.

---

### Interview Questions

* What is Node.js?
* Can JavaScript run without a browser?
* Why do we need Node.js?
* What is the difference between browser JS and Node.js JS?

---

## What Are Packages?

A **package is code that you didn’t write**.
Some other developer wrote useful code, made it public, and said:
> “Use this instead of writing everything from scratch.”

Examples:

* Sending emails
* Encrypting passwords
* Creating servers
* Handling file uploads
---

### Where Are Packages Published?

Packages are published on **npmjs.com**.

Think of npm as:

* A **store** of JavaScript code
* Where developers share reusable logic

---

### Technical Definition

A package is a reusable block of JavaScript code published on npm that can be installed and used in a Node.js project.

---

## 2. How to Install Packages

### Steps

1. **Initialize a project**

   ```bash
   npm init -y
   ```

2. This creates:

   * `package.json`

3. **Install a package**

   ```bash
   npm install package-name
   ```

   Example:

   ```bash
   npm install express
   ```

---

### What Happens Internally?

* Package code goes into:

  ```
  node_modules/
  ```
* `package.json`

  * Tracks which packages you installed
  * Tracks versions
* `package-lock.json`

  * Tracks **dependencies of your dependencies**
  * Ensures same install across systems

---

### Important Files

* **node_modules** → actual package code
* **package.json** → your project’s dependency list
* **package-lock.json** → exact dependency tree

---

### Interview Questions

* What is npm?
* What is a package?
* Difference between package.json and package-lock.json?
* Why should we not push node_modules?
---

## 2.2 What Is a Server?
A **server is a program that listens for requests and sends responses**.

Client asks:

> “Give me data”

Server replies:

> “Here is the data”

Browser, mobile apps, Postman → all are **clients**.

---

### Technical Definition

A server is a software application that listens on a network port and handles incoming HTTP requests by sending responses.

---

### Why Do We Need Servers?

* To store data
* To authenticate users
* To connect frontend with database
* To apply business logic

---

### Interview Questions

* What is a server?
* Difference between client and server?
* Can frontend act as a server?


### Why Express?

Writing servers using plain Node.js is **painful and verbose**.

Express:

* Simplifies server creation
* Handles routing
* Handles middleware

---

### Interview Questions

* What is Express?
* Why Express over Node HTTP module?
* What is a route?
* What does `app.listen` do?
