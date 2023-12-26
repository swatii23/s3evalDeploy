const mongoose = require("mongoose")

const noticeSchema = mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    category: {type: String, required: true, enum: ["parking", "covid", "maintenance"]},
    date: {type: Number, default: Date.now},
    user_email: {type: String}
})

const Noticemodel = mongoose.model("Notice", noticeSchema)

module.exports = Noticemodel