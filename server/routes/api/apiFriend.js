const express = require('express');

const route = express.Router();
const { Friend } = require('../../db/models');

route.get('/get', async (req, res) => {
  const findFriend = await Friend.findAll({
    where:
       { friend1: req.session.user.id },
  });
  res.json(findFriend);
});

route.post('/add', async (req, res) => {
  try {
    // const findFriend = Friend.findAll({
    //   where:
    //      { friend1: req.session.id, friend2: req.body.userId },
    // });
    const result = await Friend.create({
      friend1: req.session.user.id,
      friend2: req.body.userId,
    });

    if (result) {
      res.json(result);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
});

route.delete('/delete', async (req, res) => {
  console.log(req.body.userId, '1231231231231231312312312');
  try {
    const deletedUser = Friend.findAll({
      where:
         { friend1: req.session.user.id, friend2: req.body.userId },
    });
    const result = await Friend.destroy({
      where:
         { friend1: req.session.user.id, friend2: req.body.userId },
    });
    if (result) {
      res.json(deletedUser);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = route;
