const express = require("express")
const authRouts = require("./routes/auth.route")
const postRoutes = require("./routes/post.routes")
const cookieParser = require("cookie-parser")
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/auth",authRouts)
app.use("/posts",postRoutes)

module.exports = app