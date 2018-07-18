const log = require('./modules/log')

const routes = (server) => {
  log(server)

  server.get('/', (req, res, next) => {
    res.send('Server live!')
    next()
  })
}

module.exports = routes
