const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const popularItemsRoutes = require('./popularItemsRoutes');
const cryptoRoutes = require('./cryptoRoutes')
router.use('/users', userRoutes);
router.use('/popular-items', popularItemsRoutes);
router.use('/crypto' , cryptoRoutes);
module.exports = router;