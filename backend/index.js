const connectToMongo = require('./db');
const express = require('express');
require('dotenv').config();

connectToMongo();

const app = express()
const port = process.env.PORT

app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

//Availabe Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
