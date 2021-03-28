const Books = require('../models/booksModel')
const express = require('express')
const router = new express.Router()

router.post('/books', async (req, res) => {
    const book = new Books({
        ...req.body
    })
    try {
        await book.save()
        res.status(201).send(book)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/books', async (req, res) => {
    try {
        const data = await Books.find({})
        res.send(data)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/book/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const data = await Books.findOne({_id})
        res.send(data)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/books/new-arrivals', async (req, res) => {
    try {
        const data = await Books.find({isNewArrival: true})
        res.send(data)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/books/top-sellers', async (req, res) => {
    try {
        const data = await Books.find({isTopSeller: true})
        res.send(data)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/books/advanced', async (req, res) => {
    const title = req.query.title
    const author = req.query.author
    const price = req.query.price.split(",")
    const genre = req.query.genre === "any" ? "" : req.query.genre
    try {
        const books = await Books.find({
            "title": { $regex: new RegExp(title, "g") },
            "author": { $regex: new RegExp(author, "g") },
            "price": { $gte: price[0], $lt: price[1] },
            "genre": { $regex: new RegExp(genre, "g") },
        })
        if (!books)
            return res.status(404).send()
        res.status(200).send(books)
    } catch (err) {
        res.status(500).send(err)
    }

})

router.get('/books/advanced/discount', async (req, res) => {
    const discount = req.query.discount.split(",")
    try {
        const books = await Books.find({
            "discount": { $gte: discount[0], $lt: discount[1] }
        })
        if (!books)
            return res.status(404).send()
        res.status(200).send(books)
    } catch (err) {
        res.status(500).send(err)
    }

})

router.delete('/books', async (req, res) => {
    try {
        const book = await Books.findOneAndDelete({ _id: req.body._id })
        if (!book)
            return res.status(404).send()
        res.send(book)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/book/:id', async (req, res) => {
    const updates = req.body
    const _id = req.params.id
    try{
        const data = await Books.findOneAndUpdate({_id}, updates)
        res.send(data)
    }catch(e){
        console.log(e)
    }
})

module.exports = router
