// Routes of Game
const { Router } = require('express');
const router = Router();
const gameController = require('../controllers/game.controller');

// Routes
router.route('/IAToken').post(gameController.getIAToken);
router.route('/status').post(gameController.getStatus);

module.exports = router;