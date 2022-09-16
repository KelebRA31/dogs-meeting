const express = require('express');

const route = express.Router();
const { User } = require('../../db/models');

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      age, name, gender_id,
    } = req.body;
    const favorite = await User.update({ age, gender_id, name }, { where: { id } });
    if (favorite) {
      const updatedRes = await User.findByPk(id);
      res.json(updatedRes);
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = route;
