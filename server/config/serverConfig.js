const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const sessionConf = require('./sessionConfig');
const apiAuthRoute = require('../routes/api/apiAuth');
const apiRoute = require('../routes/api/apiRoute');

const serverConfig = (app) => {
  const sessionConfig = sessionConf;

  app.use(cors({
    credentials: true,
    origin: true,
  }));

  app.use(express.static(path.join(process.env.PWD, 'public')));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(session(sessionConfig));

  app.use('/api/auth', apiAuthRoute);
  app.use('/api', apiRoute);
};

export default serverConfig;
