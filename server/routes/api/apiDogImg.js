const express = require('express');

const route = express.Router();
const { Dog } = require('../../db/models');

route.patch('/', async (req, res) => {
  try {
    console.log(req.body);
    const userImg = await Dog.update({ img: req.body.str }, { where: { user_id: 3 } });
    if (userImg) {
      const updateUserImg = await Dog.findByPk(3);
      res.json(updateUserImg);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
});

route.post('/createdog', async (req, res) => {
  try {
    const dog = await Dog.create(req.body);
    if (dog) {
      res.json(dog);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = route;
