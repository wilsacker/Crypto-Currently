function requireLogin(req, res, next) {
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: 'You must be logged in to perform this action' });
  }
  next();
}


const allowGuests = (req, res, next) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = { requireLogin, allowGuests };
