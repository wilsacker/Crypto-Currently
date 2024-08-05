const requireLogin = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

const allowGuests = (req, res, next) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = { requireLogin, allowGuests };
