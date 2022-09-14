const express = require('express');
const { Op } = require('sequelize');
const serverConfig = require('./config/serverConfig');
const { Meeting } = require('./db/models');

// npm i express-session session-file-store
const app = express();
const PORT = process.env.PORT ?? 3001;

serverConfig(app);

app.listen(PORT, () => {
  setInterval(() => {
    (async () => {
      const time = new Date().toLocaleTimeString('en-US', { hour12: false });

      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();
      today = `${yyyy}-${mm}-${dd} ${time}`;

      console.log('===============>', today);

      const delFunc = await Meeting.destroy({ where: { end: { [Op.lte]: today } } });
    })();
  }, 10000);

  console.log(`Server is started on port ${PORT}`);
});
