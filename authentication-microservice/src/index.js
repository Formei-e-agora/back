const express = require('express');
const loaders = require('./loaders');

require('dotenv').config({ path: `${__dirname}/../.env` });

let server;

function startServer() {
  const app = express();
  loaders({ expressApp: app });

  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Server running on port ', process.env.PORT);
  });
}

startServer();

module.exports = server;
