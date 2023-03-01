const express = require('express');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidator } = require("../validators/validators");

const router = express.Router();



router.post('/register', (req, res) => {
    const { errors, isValid } = registerValidator(req.body);
    if (!isValid) {
        res.json({ success: false, errors });
    } else {
        // destruction 
        const { firstName, lastName, email, password } = req.body;
        const registerUser = new Users({
            firstName,
            lastName,
            email,
            password,
            createdAt: new Date()
        });
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(registerUser.password, salt, (hashError, hash) => {
                if (error || hashError) {
                    res.json({ message: 'Error unable to hash password', success: false });
                    return;
                }
                registerUser.password = hash;
                registerUser.save().then(() => {
                    res.json({ "message": "User created successfully", "success": true });
                }).catch(error => res.json({ message: error.message, success: false }));
            })
        })
    }
})



module.exports = router;