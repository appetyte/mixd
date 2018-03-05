import {
  Router
} from 'express';
import * as MixableController from '../controllers/mixable.controller';

const router = new Router();

router.route('/mixables/from_shelf')
  .get(MixableController.fromShelf);

router.route('/mixables/:id')
  .get(MixableController.show);

export default router;
