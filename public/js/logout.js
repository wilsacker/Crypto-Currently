const router = require('express').Router();

// User logout
router.post('/logout', (req, res) => {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Failed to log out' });
      } else {
        res.status(200).json({ message: 'Logged out successfully' });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

