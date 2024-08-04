const requireLogin = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    next();
  }
};

const allowGuests = (req, res, next) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = { requireLogin, allowGuests };
