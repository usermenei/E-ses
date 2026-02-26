const express = require('express');

const {
    getCoworkingspaces,
    getCoworkingspace,
    createCoworkingspace,
    updateCoworkingspace,
    deleteCoworkingspace
} = require('../controllers/coworkingspaces');

// Include other resource routers
const reservationRouter = require('./reservations');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:coworkingspaceId/reservations', reservationRouter);

router
    .route('/')
    .get(getCoworkingspaces)
    .post(protect, authorize('admin'), createCoworkingspace);

router
    .route('/:id')
    .get(getCoworkingspace)
    .put(protect, authorize('admin'), updateCoworkingspace)
    .delete(protect, authorize('admin'), deleteCoworkingspace);

module.exports = router;