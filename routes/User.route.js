const express = require("express")
const bcrypt = require("bcrypt")
require("dotenv").config()
const jwt = require("jsonwebtoken")

const Usermodel = require("../models/User.model")

const router = express.Router()



router.post("/register", async(req, res) => {
    try {
        const user = req.body
        req.body.password = await bcrypt.hash(req.body.password, process.env.SaltRounds)
        await Usermodel.create(user)
        res.status(201).send({user, message: "signup successful."})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/login", async(req, res) => {
    try {
        const user = req.body
        const dbUser = await Usermodel.findOne(user.email)

        if(!dbUser)
        return res.status(500).send({message: "Login Failed"})

        const hashed_pwd = dbUser.password

        bcrypt.compare(user.password, hashed_pwd, (err, result) => {
            if(result) {
                const token = jwt.sign({email: user.email}, process.env.Secret_Key)
                res.status(201).send({message: "Login successful.", token})
            }
            else{
                res.status(500).send({message: "Invalid credentials"})
            }
        })
        
    } catch (error) {
        res.status(401).send({error: "Login Failed."})
    }
})

module.exports = router