const express = require('express');
const multer = require('../../middlewares/multer');

const route = express.Router();
const { User } = require('../../db/models');

route.patch('/', async (req, res) => {
  try {
    console.log(req.body);
    const userImg = await User.update({ img: req.body.str }, { where: { id: 1 } });
    if (userImg) {
      const updateUserImg = await User.findByPk(1);
      res.json(updateUserImg);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = route;
