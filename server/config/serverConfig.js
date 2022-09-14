const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { Op } = require('sequelize');
const http = require('http');
const store = require('session-file-store');
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
const { Meeting } = require('../db/models');
const wss = require('../webSocket');
const userRouter = require('../routes/userRouter');

const FileStore = store(session);

const serverConfig = (app) => {
  const sessionConfig = sessionConf;
  const PORT = process.env.PORT ?? 3001;

  app.use(cors({
    credentials: true,
    origin: true,
  }));

  const sessionParser = session({
    name: 'sid',
    store: new FileStore({}),
    secret: 'jdkjelkwjelk',
    saveUninitialized: false,
    resave: false,
    cookie: {
      expires: 24 * 60 * 60e3,
      httpOnly: true,
    },
  });

  app.use(sessionParser);

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
  app.use('/api/user', userRouter);
  // app.use('/user', )

  const server = http.createServer(app);

  server.on('upgrade', (request, socket, head) => {
    console.log('Parsing session from request...', app.locals.ws);

    // WS with client doesn't have a session connection is closed
    sessionParser(request, {}, () => {
      if (!request.session.user) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }

      console.log('Session is parsed!');

      // WS client has a session connection
      // socket emits event connection
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request, app.locals.ws);
      });
    });
  });

  server.listen(PORT, () => {
    setInterval(() => {
      (async () => {
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });

        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd} ${time}`;

        console.log('===============>', today);

        const delFunc = await Meeting.destroy({ where: { end: { [Op.lte]: today } } });
      })();
    }, 10000000);

    console.log(`Server is started on port ${PORT}`);
  });
};

module.exports = serverConfig;
