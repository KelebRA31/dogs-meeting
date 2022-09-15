const express = require('express');

const route = express.Router();
const { Meeting, User_on_meeting } = require('../../db/models');

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
  console.log(meeting, '12++++++++++++++');
  res.json(meeting);
});

route.get('/:id', async (req, res) => {
  const meeting = await Meeting.findOne({ where: { id: req.params.meetingId } });
  // console.log(meeting);
  res.json(meeting);
});

module.exports = route;
