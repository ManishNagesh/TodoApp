require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000;

// import routes
const todoRoutes = require('./routes/todos')
const authRoute = require('./routes/auth')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/todos', todoRoutes)
app.use('/api/auth', authRoute)



// connect to db
mongoose.connect(process.env.MONGO_URI, { dbName: 'todo-app'})
    .then(()=> {
        // listen for requests
        app.listen(PORT, () => {
            console.log(`connected to db & Server listening on port ${PORT}`);
          });
    })
    .catch((error) => {
        console.log(error)
        console.log('error ki mkb')
    })

