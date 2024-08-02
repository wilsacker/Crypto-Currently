const express = require('express');
const router = express.Router();

const apiRoutes = require('./api/index.js');
const myWatchlist = require('./myWatchlist');
const homeRoutes = require('./homeRoutes');



// Define routes

router.use('/myWatchlist' ,myWatchlist);
router.use('/', homeRoutes);
router.use('/api' , apiRoutes);


module.exports = router;
