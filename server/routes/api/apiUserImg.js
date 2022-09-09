const express = require('express');

const route = express.Router();
const { User } = require('../../db/models');

route.patch('/', async (req, res) => {
  try {
    console.log(req.body);
    const userImg = await User.update({ img: req.body.str }, { where: { id: 3 } });
    if (userImg) {
      const updateUserImg = await User.findByPk(3);
      res.json(updateUserImg);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = route;
