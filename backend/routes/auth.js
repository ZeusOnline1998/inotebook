const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'JWTSomethingSecret'

//Create a user using: POST "/api/auth/". No login required
router.post('/createuser', [
    //Used express validator for parameters constraint 
    body('name', "Name should be more than 2 characters").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    //Check for error with express validator and return the error with status 400 if there are any or proceed further
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() })
    }
    try { //Use try catch block for internal server error if they are mistakes on server side rather than on client side
        //Check whether email already exists in the database 
        let user = await User.findOne({ email: req.body.email })
        if (user) { //if yes then throw error with bad request
            return res.status(400).json({ error: "User with this email already exists" })
        }
        //Other continue by creating user

        //Create a hash for password for security before storing the hashed password in the db
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        // console.log(authToken)
        res.json({ authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
    
})


module.exports = router