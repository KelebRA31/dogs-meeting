const express = require('express');

const route = express.Router();
const { User, Gender } = require('../../db/models');

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const favorite = await User.update(req.body, { where: { id }, include: { model: Gender } });
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
