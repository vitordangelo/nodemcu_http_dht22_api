const log = (deps) => {
  return {
    save: (log) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          INSERT INTO
          logs
          (temperature, humidity)
          VALUES (?, ?)`

        connection.query(query, [log.temperature, log.humidity], (error, results) => {
          if (error) {
            console.log(error)
            errorHandler(error, `Falha ao cadastrar log`, reject)
            return false
          }
          resolve({ status: 200, id: results.insertId })
        })
      })
    },

    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps

        const query = `
          SELECT 
          temperature, humidity, DATE_FORMAT(created_at, "%d/%m/%Y %H:%i:%s") as created_at
          FROM logs
          ORDER BY created_at DESC`

        connection.query(query, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar logs', reject)
            return false
          }
          resolve({status: 200, logs: results})
        })
      })
    }
  }
}

module.exports = log
