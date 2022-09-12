const express = require('express');

const route = express.Router();
const { Meeting } = require('../../db/models');

route.post('/', async (req, res) => {
  const {
    inputs,
  } = req.body;
  console.log(req.session);
  const meeting = await Meeting.create({
    ...inputs, user_id_creator: req.session.userId,
  });

  //   const m = await Meeting.findByPk(meeting.dataValues.id, {
  //     include: User,
  //   });

  res.json(meeting);
});

module.exports = route;
