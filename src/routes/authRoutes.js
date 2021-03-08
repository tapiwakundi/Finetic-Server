const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const requireAuth = require('../middlewares/requireAuth')
const router = express.Router()

router.post('/signup', async(req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        const user = new User({firstName, lastName, email, password})
        await user.save()
        
        const token = jwt.sign({ userId: user._id}, 'MY_SECRET_KEY')
        
        res.send({ token })
        
    } catch (err) {
        return res.status(422).send(err.message)
    }
   

})


router.post('/signin', async (req, res) => {
    const {email, password} = req.body; 

    if(!email || !password) return res.status(422).send({error: 'Must provide login detaills'})

    const user = await User.findOne({email})

    if(!user) return res.status(422).send({error: 'Invalid email or password'})

    try {
        await user.comparePassword(password)
        const token = jwt.sign({userId: user._id }, 'MY_SECRET_KEY')
        res.send({token})
    } catch (error) {
        return res.status(422).send({error: 'Invalid email or password'})
    }

})

router.get('/get-users', requireAuth, (req, res) => {
    const userId = req.user._id

    User.findOne({ _id: userId }).then(
        user => {
            if (!user) { console.log('no such user') }
            res.status(200).json(user)
        }

    )
})




module.exports = router