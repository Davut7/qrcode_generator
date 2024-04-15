import qr from 'qrcode';
import { createCanvas, loadImage } from 'canvas';
import { v4 as uuid } from 'uuid';
import { createWriteStream } from 'fs';
import { unlink } from 'fs/promises';

class QrcodeService {
	async generateQrcode(vCardString) {
		const outputFileName = `./uploads/qrcode${uuid()}.png`;
		qr.toFile(outputFileName, vCardString, {
			type: 'png',
			errorCorrectionLevel: 'H',

			margin: 1,
			scale: 8,
		});
		return outputFileName;
	}

	async addLogoToQrcode(qrImagePath, image, outputFileName) {
		const canvas = createCanvas(400, 400);
		const context = canvas.getContext('2d');

		const qrImage = await loadImage(qrImagePath);
		context.drawImage(qrImage, 0, 0, 400, 400);

		const logoImage = await loadImage(image.path);

		const logoSize = 150;
		const x = (canvas.width - logoSize) / 2;
		const y = (canvas.height - logoSize) / 2;

		context.drawImage(logoImage, x, y, logoSize, logoSize);

		const outputStream = createWriteStream(outputFileName);
		const pngStream = canvas.createPNGStream();

		pngStream.pipe(outputStream);
		outputStream.on('finish', async () => {
			await unlink(qrImagePath);
			await unlink(image.path);
		});
	}

	async generateVCard(data) {
		const vCardString = `BEGIN:VCARD
		VERSION:3.0
		N:${data.firstName};${data.lastName};
		TEL;TYPE=work,VOICE:${data.phone1}
		TEL;TYPE=home,VOICE:${data.phone2}
		EMAIL:${data.email}
		ADR;TYPE=WORK,PREF:${data.address},
		URL:${data.website}
		URL;TYPE=INSTAGRAM:${data.instagram}
		URL;TYPE=WHATSAPP:${data.whatsapp}
		URL;TYPE=TELEGRAM:${data.telegram}
		END:VCARD`;
		return vCardString;
	}
}
export default new QrcodeService();
