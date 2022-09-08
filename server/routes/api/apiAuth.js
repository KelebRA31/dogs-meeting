const bcrypt = require('bcrypt');
const express = require('express');
const { User } = require('../../db/models');

const route = express.Router();

route.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('mega-cookie');
    res.sendStatus(200);
  } catch (error) {
    res.json(error);
  }
});

route.post('/register', async (req, res) => {
  try {
    const {
      email, password, name, nickName,
    } = req.body;
    console.log(process.env.CRYPT_ROUNDS);

    const result = await User.create({
      email,
      password: await bcrypt.hash(password, Number(process.env.CRYPT_ROUNDS)),
      name,
      nickName,
    });
    if (result.id) {
      req.session.userName = result.nickName;
      req.session.userId = result.id;
      return res.json(result);
    }
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

export default route;
