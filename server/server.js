const express = require('express');
const serverConfig = require('./config/serverConfig');

// npm i express-session session-file-store
const app = express();
app.locals.ws = new Map();

serverConfig(app);
