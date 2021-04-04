const Admin = require('../models/adminModel')
const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')



router.post('/admin/new', async (req, res) => {
    const user = new Admin(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/admin/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.query.username, req.query.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/admin/logout', auth, async (req, res) => {
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

router.post('/admin/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send('Logged out all devices')
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router