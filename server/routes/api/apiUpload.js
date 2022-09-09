const express = require('express');
const multer = require('../../middlewares/multer');

const route = express.Router();

route.post('/upload', multer.single('avatar'), (req, res) => {
  try {
    if (req.file) {
      res.json(req.file);
    }
  } catch (error) {
    res.json(error);
  }
});

export default route;
