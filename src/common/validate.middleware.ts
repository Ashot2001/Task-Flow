import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware {
	constructor(
		private validations: { class: ClassConstructor<object>; source: 'body' | 'params' | 'query' }[],
	) {}

	async execute(req: Request, res: Response, next: NextFunction) {
		for (const validation of this.validations) {
			const data = req[validation.source];
			const instance = plainToClass(validation.class, data, { enableImplicitConversion: false });

			const errors = await validate(instance, {
				skipMissingProperties: false,
				forbidUnknownValues: true,
				forbidNonWhitelisted: true,
			});
			if (errors.length > 0) {
				console.log('Validation errors:', errors);
				res.status(422).json({ errors });
				return;
			}
		}
		next();
	}
}
