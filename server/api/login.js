const router = require('express').Router();
const { User } = require('../db/models');

router.post('/', (req, res, next) => {
  console.log('you have reached login');
  const email = req.body.email;
  const password = req.body.password;
  User.find({
    where: {
      email: email,
    }
  })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found');
      }
      else if (!user.correctPassword(password)) {
        res.status(401).send('Incorrect password');
      }
      else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

module.exports = router;
