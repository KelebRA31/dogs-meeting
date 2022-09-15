const express = require('express');

const route = express.Router();
const { Meeting } = require('../../db/models');

route.post('/', async (req, res) => {
  // console.log(req.session);
  // console.log(req.body);
  const meeting = await Meeting.create({
    ...req.body, user_id_creator: req.session.user.id,
  });

  res.json(meeting);
});

// ручка для всех митингов
route.get('/', async (req, res) => {
  const meeting = await Meeting.findAll({ include: { all: true } });
  // console.log(meeting);
  res.json(meeting);
});

route.delete('/:id/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  const result = await Meeting.destroy({ where: { id: meetingId } });
  const meeting = await Meeting.findAll();
  if (result) {
    res.json(meeting);
  } else {
    req.sendStatus(400);
  }
});

module.exports = route;
