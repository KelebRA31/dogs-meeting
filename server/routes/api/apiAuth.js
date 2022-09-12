const bcrypt = require('bcrypt');
const express = require('express');
const { check, validationResult } = require('express-validator');
const { User } = require('../../db/models');

const route = express.Router();

route.get('/check', async (req, res) => {
  try {
    const result = await User.findByPk(req.session.userId);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

route.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('mega-cookie');
    res.sendStatus(200);
  } catch (error) {
    res.json(error);
  }
});

route.post('/register', [
  check('email', 'Некоррекктный email').isEmail(),
  check('password', 'Пароль должен быть не менее 6 символов').isLength({ min: 6 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Некорректный запрос', errors });
    }
    const {
      email, password, name, nickName, gender_id,
    } = req.body;
    console.log(typeof (gender_id));
    console.log(process.env.CRYPT_ROUNDS);

    const candidateByEmail = await User.findOne({ where: { email } });
    if (candidateByEmail) {
      return res.status(400).json({ message: `Пользоаватель с email ${email} уже существует` });
    }
    const candidateByNick = await User.findOne({ where: { nickName } });
    if (candidateByNick) {
      return res.status(400).json({ message: `Пользоаватель с nick ${nickName} уже существует` });
    }

    const result = await User.create({
      email,
      password: await bcrypt.hash(password, Number(process.env.CRYPT_ROUNDS)),
      name,
      nickName,
      gender_id,
    });
    if (result.id && result.name !== 'SequelizeDatabaseError') {
      req.session.userName = result.nickName;
      req.session.userId = result.id;
      return res.json(result);
    }
    res.sendStatus(404);

    throw Error(result);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

route.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ where: { email } });
    if (!result) {
      return res.sendStatus(400);
    }
    if (await bcrypt.compare(password, result.password)) {
      req.session.userName = result.name;
      req.session.userId = result.id;
      console.log(req.session);
      return res.json(result);
    }
    throw Error(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = route;
