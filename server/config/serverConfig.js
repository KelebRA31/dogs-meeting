const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const sessionConf = require('./sessionConfig');
const apiAuthRoute = require('../routes/api/apiAuth');
const apiRoute = require('../routes/api/apiRoute');
const apiUserImg = require('../routes/api/apiUserImg');
const apiUserChangeInfo = require('../routes/api/apiUserChangeInfo');
const apiDogImg = require('../routes/api/apiDogImg');
const renderUsers = require('../routes/render/renderUsers');
const renderDogs = require('../routes/render/renderDogs');
const apiEvent = require('../routes/api/apiEvent');
const apiCreatedEvents = require('../routes/api/apiCreatedEvents');

const serverConfig = (app) => {
  const sessionConfig = sessionConf;

  app.use(cors({
    credentials: true,
    origin: true,
  }));

  app.use(express.static(path.join(process.env.PWD, 'public')));
  app.use(express.json({ extended: true }));
  app.use(morgan('dev'));
  app.use(session(sessionConfig));

  app.use('/api/auth', apiAuthRoute);
  app.use('/api', apiRoute);
  app.use('/api/event', apiEvent);
  app.use('/api/mycreatedevents', apiCreatedEvents);
  app.use('/api/setuserimg', apiUserImg);
  app.use('/api/setdogimg', apiDogImg);
  app.use('/api/profilechange', apiUserChangeInfo);
  app.use('/profile', renderUsers);
  app.use('/mydogs', renderDogs);
};

module.exports = serverConfig;
