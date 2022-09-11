const express = require('express');

const route = express.Router();
const { User } = require('../../db/models');

route.patch('/', async (req, res) => {
  try {
    console.log(req.session);
    console.log(req.body);
    const { id, str } = req.body;
    const userImg = await User.update({ img: str }, { where: { id } });
    if (userImg) {
      const updateUserImg = await User.findByPk(id);
      res.json(updateUserImg);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = route;
