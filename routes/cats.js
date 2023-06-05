const express = require('express');
const router = express.Router();
const catsController = require('../controllers/cats');
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .get(catchAsync(catsController.index))
    .post(catchAsync(catsController.createCat))

router.get('/new', catsController.renderNewForm)

router.route('/:id')
    .get(catchAsync(catsController.showCat))
    .put(catchAsync(catsController.updateCat))
    .delete(catchAsync(catsController.deleteCat))

router.get('/:id/edit', catsController.renderEditForm)

module.exports = router;