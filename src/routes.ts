import { Router } from 'express';
import { DefaultController } from './controllers/DefaultController';

const router = Router();


router.get('/test/:code', new DefaultController().handleSearch);

export { router }
