import { Router } from 'express';
import qrcodeRouter from './qrcodeRouter.js';

const router = Router();

router.use('/', qrcodeRouter);

export default router;
