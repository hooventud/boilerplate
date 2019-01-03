const router = require('express').Router();
const { User } = require('../db/models');

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      res.status(401).send('User Not Found');
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect Password');
    } else {
      req.login(user, error => {
        if (error) next(error);
        else res.json(user);
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, error => {
      if (error) next(error);
      else res.json(user);
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

module.exports = router;
