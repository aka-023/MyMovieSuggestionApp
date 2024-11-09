const express = require('express');
const { addToFavourites, getAllFavourites, removeFromFavourites } = require('../controllers/favouriteController');
const { identifier } = require('../middlewares/verify');

const router = express.Router();

router.post('/add', identifier ,addToFavourites);
router.get('/getall', identifier , getAllFavourites);
router.delete('/delete', identifier , removeFromFavourites);

module.exports = router;