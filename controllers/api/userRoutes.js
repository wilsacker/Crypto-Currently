const router = require('express').Router();
const { User } = require('../../models');

// Route to create a new user (sign-up)
router.post('/', async (req, res) => {
  // try {
    console.log(req.body);
    const { username, password } = req.body;

    // Hash the password
    

    // Create a new user with hashed password
    const newUser = await User.create({ username, password });

    // Save session
    req.session.save(() => {
      req.session.user_id = newUser.id; // Store user ID in session
      req.session.username = newUser.username; // Store username in session
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  // } catch (err) {
  //   console.error('Error creating user:', err); // Log the error for debugging
  //   res.status(500).json({ message: 'Failed to create user', error: err });
  // }
});

// Route to login a user
router.post('/login', async (req, res) => {
  try {
  
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


// Route to logout a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
