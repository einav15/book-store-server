const { ObjectID } = require('mongodb')
const mongoose = require ('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        required: true,
        trim: true,
        type: String,
    },
    imgSrc: {
        required: true,
        trim: true,
        type: String,
    },
    shortTitle: {
        required: true,
        trim: true,
        type: String,
    },
    author: {
        required: true,
        trim: true,
        type: String,
    },
    genre: {
        required: true,
        trim: true,
        type: String,
    },
    price: {
        required: true,
        type: Number,
    },
    discount: {
        default: 0,
        type: Number,
    },
    isTopSeller: {
        default: false,
        type: Boolean,
    },
    isNewArrival: {
        default: false,
        type: Boolean,
    },
    description: {
        type: String,
        trim: true,
        default: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
})

const Book = mongoose.model('Books', bookSchema)

module.exports = Book
