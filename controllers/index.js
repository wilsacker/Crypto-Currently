const express = require('express');
const router = express.Router();

const apiRoutes = require('./api/index.js');
const myWatchList = require('./myWatchListRoutes.js');
const homeRoutes = require('./homeRoutes');



// Define routes

router.use('/watchlist' ,myWatchList);
router.use('/', homeRoutes);
router.use('/api' , apiRoutes);


module.exports = router;


