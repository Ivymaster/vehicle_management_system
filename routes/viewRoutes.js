const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);
router.get('/createUser', viewsController.getUserForm);
router.post('/createUser', viewsController.createUser);

router.get('/userLocations/:id', viewsController.getLocations);

router.get('/userLocation/:id', viewsController.saveLocation);

module.exports = router;
