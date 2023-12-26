const express = require("express")
require("dotenv").config()

const connection = require("./db")
const UserRoute = require("./routes/User.route")
const NoticeRoute = require("./routes/Notice.route")

const app = express()
app.use(express.json())

app.use("/auth", UserRoute)
app.use("/notice", NoticeRoute)

const port = process.env.Port
app.listen(port, async() => {
    try {
        await connection
        console.log("connection established")
    } catch (error) {
        console.error(error)
    }
    console.log(`Server is running on ${port}`)
})