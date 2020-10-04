const express = require('express')
const loaders = require('./loaders')
require('dotenv').config({ path: `${__dirname}/../.env` })

async function startServer () {
  const app = express()
  await loaders({ expressApp: app })

  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Server running on port ', process.env.PORT)
  })
}
startServer()
