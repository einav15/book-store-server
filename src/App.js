const express = require('express')
const cors = require('cors')
const BooksRouter = require('./routers/BooksRouter')
const UsersRouter = require('./routers/UsersRouter')
const app = express()

const whiteList = [
    "http://localhost:3001",
    "http://einav-book-store.s3-website-eu-west-1.amazonaws.com/",
];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

require('./db/mongoose')

app.use(express.json())
app.use(cors(corsOptions))
app.use(BooksRouter)
app.use(UsersRouter)

app.use("/", (req, res) => {
    res.send("ok");
});


module.exports = app