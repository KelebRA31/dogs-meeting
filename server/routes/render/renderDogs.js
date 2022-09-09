const express = require('express');
const { Dog, Gender } = require('../../db/models');

const route = express.Router();

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const result = await Dog.findAll({ where: { user_id: id }, include: { model: Gender } });
    console.log(result);
    res.json(result);
  } catch (err) {
    res.sendStatus(400);
    console.log(err);
  }
});

module.exports = route;
