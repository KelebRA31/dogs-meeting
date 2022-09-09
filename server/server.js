const express = require('express');
const serverConfig = require('./config/serverConfig');

// npm i express-session session-file-store
const app = express();
const PORT = process.env.PORT ?? 3001;

serverConfig(app);

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
