import Joi from 'joi';

const qrcodeValidation = Joi.object({
	firstName: Joi.string().optional(),
	lastName: Joi.string().optional(),
	phone1: Joi.string().optional(),
	phone2: Joi.string().optional(),
	email: Joi.string().email().optional(),
	address: Joi.string().optional(),
	website: Joi.string().optional(),
	whatsapp: Joi.string().optional(),
	tiktok: Joi.string().optional(),
	instagram: Joi.string().optional(),
	telegram: Joi.string().optional(),
});

export default qrcodeValidation;
