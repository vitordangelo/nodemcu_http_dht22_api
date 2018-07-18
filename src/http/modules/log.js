const db = require('../../services/mysql')
const v1 = '/api/v1/'

const routes = (server) => {
  server.post(v1 + 'log', async (req, res, next) => {
    const log = req.body
    try {
      res.send(await db.logs().save(log))
    } catch (error) {
      res.send(error)
    }
    next()
  })

  server.get(v1 + 'logs', async (req, res, next) => {
    try {
      res.send(await db.logs().all())
    } catch (error) {
      res.send(422, error)
    }
    next()
  })
}

module.exports = routes
