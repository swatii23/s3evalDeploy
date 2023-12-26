const jwt = require("jsonwebtoken")
require("dotenv").config()

const Usermodel = require("../models/User.model")


const authenticate = async(req, res, next) => {
    const token = req.headers.Authorization?.split(" ")[1]

    jwt.verify(token, process.env.Secret_Key, (err, decoded) => {
        if(decoded)
        {
            req.email = email
            next()
        }
        else{
            return res.send("Login first.")
        }
    })
}

module.exports = authenticate