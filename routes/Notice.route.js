const express = require("express")

const Notice = require("../models/Notice.model")
const auth = require("../middlewares/authenticate")

const router = express.Router()

router.get("/", auth, async(req, res) => {
    try {
        const { category } = req.query
        const notices = await Notice.find({category})
        res.status(200).send(notices)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/", auth, async(req, res) => {
    try {
        const notice = req.body
        notice.user_email = req.email
        await Notice.create(notice) 
        res.status(201).send({message: "created successfully"})       
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch("/:id", auth, async(req, res) => {
    try {
        const { id } = req.params
        const payload = req.body

        const email = req.email
        const notice = await Notice.findOne({_id: id})

        if(email != notice.email){
            return res.status(401).send({message: "You are not authorized"})
        }
        else{
            await Notice.findByIdAndUpdate(id, payload)
            return res.status(200).send({message: "Notice updated."})
        }      
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/:id", auth, async(req, res) => {
    try {
        const { id } = req.params

        const email = req.email
        const notice = await Notice.findOne({_id: id})

        if(email != notice.email){
            return res.status(401).send({message: "You are not authorized"})
        }
        else{
            await Notice.findByIdAndDelete(id)
            return res.status(200).send({message: "Notice deleted."})
        }      
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router