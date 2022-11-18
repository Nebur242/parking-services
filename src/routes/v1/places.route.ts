import express from 'express';
import validate from '../../middlewares/validate';
import validators from '../../modules/places/validators';
import placesController from '../../modules/places/places.controller';

const router = express.Router();

router.get('/', placesController.findAll);
router.post('/', validate(validators.createPlace), placesController.create);
router.get('/:id', validate(validators.findOne), placesController.findOne);
router.patch('/:id', validate(validators.updatePlace), placesController.update);
router.delete('/:id', validate(validators.findOne), placesController.delete);

export default router;
