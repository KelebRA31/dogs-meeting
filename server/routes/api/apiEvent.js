const express = require('express');

const route = express.Router();
const { Meeting } = require('../../db/models');

route.post('/', async (req, res) => {
  console.log(req.session);
  console.log(req.body);
  const meeting = await Meeting.create({
    ...req.body, user_id_creator: req.session.userId,
  });

  //   const m = await Meeting.findByPk(meeting.dataValues.id, {
  //     include: User,
  //   });

  res.json(meeting);
});

module.exports = route;
