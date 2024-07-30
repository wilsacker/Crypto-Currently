const router = require('express').Router();
const { User } = require('../../models');

// User login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    res.status(200).json({ user: userData, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
