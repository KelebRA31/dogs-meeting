const express = require('express');

const route = express.Router();
const { Meeting, User_on_meeting } = require('../../db/models');

route.post('/', async (req, res) => {
  const meeting = await Meeting.create({
    ...req.body, user_id_creator: req.session.user.id,
  });

  res.json(meeting);
});

// ручка для всех митингов
route.get('/', async (req, res) => {
  const meeting = await Meeting.findAll({ include: { all: true } });
  res.json(meeting);
});

route.get('/:id', async (req, res) => {
  const meeting = await Meeting.findOne({ where: { id: req.params.meetingId } });
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
route.post('/addUser', async (req, res) => {
  try {
    const { user_id, meeting_id, dog_id } = req.body;
    const result = await User_on_meeting.create(req.body);
    if (result) {
      const addedUser = User_on_meeting.findOne({ where: { user_id, meeting_id, dog_id } });
      res.json(addedUser);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
});

route.delete('/delUser', async (req, res) => {
  try {
    const { user_id, meeting_id } = req.body;
    const deletedUser = User_on_meeting.findAll({ where: { user_id, meeting_id } });
    const result = await User_on_meeting.destroy({ where: { user_id, meeting_id } });
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
