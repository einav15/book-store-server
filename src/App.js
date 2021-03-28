const express = require('express')
const cors = require('cors')
const BooksRouter = require('./routers/BooksRouter')
const UsersRouter = require('./routers/UsersRouter')
const app = express()

require('./db/mongoose')

app.use(express.json())
app.use(cors())
app.use(BooksRouter)
app.use(UsersRouter)

app.use("/", (req, res) => {
    res.send("ok");
});


module.exports = app