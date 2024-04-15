import { Router } from 'express';
import upload from '../services/multer.js';
import catchAsync from '../utils/catchAsync.js';
import qrcodeController from '../controllers/qrcodeController.js';

const router = Router();

router.post(
	'/generate-qrcode',
	upload.single('image'),
	catchAsync(qrcodeController.generateQrcode)
);

export default router;
