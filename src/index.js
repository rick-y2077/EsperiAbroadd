const express = require('express')

const app = express()

//app.get("/", (req, res) => {
//  res.send("messaggio")
//})

function formatURL(path){
  if(path == '/')
    path+='index'
  return "/public/routes" + path + ".html"
}

app.use(express.static("public"))
app.use((req, res) => {
  console.log(__dirname)
  const dir = __dirname.slice(0, -4)
  const page = formatURL(req.path)
  res.sendFile(dir + page, (err) => {
    res.status(404)
    res.redirect("/error")
    console.log(err)
  })
})

app.listen(3000)
