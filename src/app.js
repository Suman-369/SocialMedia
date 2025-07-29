const express = require("express")
const authRouts = require("./routes/auth.route")
const app = express()
app.use(express.json())

app.use("/auth",authRouts)

module.exports = app