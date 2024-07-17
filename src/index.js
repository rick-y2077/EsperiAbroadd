const express = require('express')
const branilianRouter = require('./router.js')

const app = express()

// Static files are served from the public directory
app.use(express.static("public"))

// The branilianRouter handles all the other requests
app.use(branilianRouter)

app.listen(3000)
