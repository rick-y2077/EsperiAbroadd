function branilianRouter(req, res) {
  const dir = __dirname.slice(0, -4)
  const page = formatURL(req.path)

  res.sendFile(dir + page, pageNotFound => {
    if (pageNotFound) {
      res.status(404)
      res.redirect('/error')
    }
  })
}

function formatURL(path) {
  if (path == '/') {
    path+='index'
  }

  return "/public/routes" + path + ".html"
}

module.exports = branilianRouter