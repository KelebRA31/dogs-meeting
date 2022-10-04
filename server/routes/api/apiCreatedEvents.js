const express = require('express');

const route = express.Router();
const { Meeting } = require('../../db/models');

route.get('/:id', async (req, res) => {
  const meeting = await Meeting.findAll({
    where: { user_id_creator: req.params.id },
    include: { all: true },
  });
  res.json(meeting);
});

module.exports = route;
