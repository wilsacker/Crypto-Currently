const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const myWatchlist = require('./myWatchlist');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/myWatchlist', myWatchlist);

module.exports = router;