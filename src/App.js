const express = require('express')
const cors = require('cors')
const BooksRouter = require('./routers/BooksRouter')
const UsersRouter = require('./routers/UsersRouter')
const AdminRouter = require('./routers/AdminRouter')
const app = express()

require('./db/mongoose')

app.use(express.json())
app.use(cors())
app.use(BooksRouter)
app.use(UsersRouter)
app.use(AdminRouter)

app.use("/", (req, res) => {
    res.send("ok");
});


module.exports = app