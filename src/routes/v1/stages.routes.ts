import express from 'express';
import stagesController from '../../modules/stages/stages.controller';
import validators from '../../modules/stages/validators';
import validate from '../../middlewares/validate';

const router = express.Router();

router.get('/', stagesController.findAll);
router.post('/', validate(validators.createStage), stagesController.create);
router.get('/:id', validate(validators.findOne), stagesController.findOne);
router.patch('/:id', validate(validators.updateStage), stagesController.update);
router.delete('/:id', validate(validators.findOne), stagesController.delete);

export default router;
