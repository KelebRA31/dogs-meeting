const express = require('express');
const { User, Gender } = require('../../db/models');

const route = express.Router();

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const result = await User.findOne({ where: { id }, include: { model: Gender } });
    // console.log(JSON.stringify(JSON.parse(result)));
    res.json(result);
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
  }
});

module.exports = route;
