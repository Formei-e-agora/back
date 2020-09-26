const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const session = require('express-session');
const helper = require('../../../helpers/helper');
const errorHandler = require('../../../helpers/errors/errorHandler');
const router = require('../api/router');
const passport = require('../config/passport');

module.exports = async ({ app }) => {
  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
  app.enable('trust proxy');

  const corsOptions = {
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Access-Token'],
    exposedHeaders: ['Access-Token'],
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  helper.createFolderIfNotExist(path.join(__dirname, '../../logs'));
  app.use(morgan('dev'));
  app.use(morgan('[:date[iso]] - :status - ":method :url HTTP/:http-version" - :remote-addr - :remote-user - :total-time ms', {
    stream: fs.createWriteStream(path.join(__dirname, '../../logs/requests.log'), { flags: 'a' }),
  }));

  app.use(
    session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(router(passport));
  app.use(errorHandler);
  return app;
};
