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

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Dog.destroy({ where: { id } });
    if (result) {
      res.json({ id });
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
});

route.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dog = await Dog.update(req.body, { where: { id } });
    if (dog) {
      const updatedRes = await Dog.findByPk(id);
      res.json(updatedRes);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = route;
