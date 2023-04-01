const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const validateRegisterInput = require('../validation/registervalidation')


// @route   GET /api/todos/test
// @desc    Test the todos route
// @access  Public
router.get('/test', (req, res)=> {
    res.send("Auth route working")
})

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Private
router.post('/register', async (req, res)=> {
    console.log('req.body:', req.body); // log the value of req.body
    console.log('req.body.password:', req.body.password); // log the value of req.body.password

    try{
        const {errors, isValid} = validateRegisterInput(req.body)

        if(!isValid) {
            return res.status(400).json(errors)
        }
        
        // check for existing user
        const existingEmail = await User.findOne({ 
            email: new RegExp("^" + req.body.email + "$", "i")
        })

        if(existingEmail) {
            return res
                .status(400)
                .json({error: "There is already a user with this email"})
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 12)

        // create a new user
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
        })

        // save the user to the database
        const savedUser = await newUser.save()

        // return the new user
        return res.json(savedUser)
    } catch (err) {
        console.log(err)

        res.status(400).send(err.message)
    }

})

module.exports = router;