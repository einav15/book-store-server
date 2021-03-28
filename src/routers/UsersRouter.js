const User = require('../models/usersModel')
const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.query.username, req.query.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('Logged out')
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/users/update', auth, async (req, res) => {
    const { cart, _id } = req.body
    try {
        const user = await User.findByIdAndUpdate(_id, { cart }, {
            new: true,
            runValidators: true
        })
        if (!user)
            return res.status(404).send({
                status: 404,
                message: "No users!"
            })
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/users/me', auth, async (req, res) => {
    try{
        const user = req.user
        res.send(user)
    }catch(e){
        res.status(404).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send('Logged out all devices')
    } catch (err) {
        res.status(500).send(err)
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (err) {
        res.status(500).send(err)
    }
})



module.exports = router