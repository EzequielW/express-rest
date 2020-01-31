const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
require('dotenv/config')

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')
const commentsRoute = require('./routes/comments')

app.use('/posts', postsRoute)
app.use('/user', authRoute)
app.use('/comments', commentsRoute)

// Connection
mongoose.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => console.log('Connected to database')
);

app.listen(3000);