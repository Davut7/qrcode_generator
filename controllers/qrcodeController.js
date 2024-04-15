import qrcodeService from '../services/qrcodeService.js';
import { unlink } from 'fs';
import qrcodeValidation from '../helper/validation.js';
import createError from 'http-errors';
import { v4 as uuid } from 'uuid';

class QrcodeController {
	async generateQrcode(req, res) {
		const dto = req.body;
		const { error } = qrcodeValidation.validate(req.body, {
			abortEarly: true,
		});
		if (error) throw createError.BadRequest(error.details[0].message);
		const image = req.file;

		const vCard = await qrcodeService.generateVCard(dto);

		const qrcodeFilePath = await qrcodeService.generateQrcode(vCard, image);
		const outputFileName = `./uploads/qrcode_with_logo_${uuid()}.png`;
		setTimeout(async () => {
			await qrcodeService.addLogoToQrcode(
				qrcodeFilePath,
				image,
				outputFileName
			);

			setTimeout(async () => {
				res.download(outputFileName, 'qrcode.png', (err) => {
					if (err) {
						console.error('Error downloading QR code:', err);
					} else {
						console.log('QR code downloaded successfully!');
						unlink(outputFileName, (deleteErr) => {
							if (deleteErr) {
								console.error(
									'Error deleting QR code file:',
									deleteErr
								);
							} else {
								console.log(
									'QR code file deleted successfully!'
								);
							}
						});
					}
				});
			}, 2000);
		}, 1000);
	}
}

export default new QrcodeController();
