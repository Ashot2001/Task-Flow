import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { LoggerService } from '../logger/logger.service';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.LoggerService) public loggerService: LoggerService) {
		const result: DotenvConfigOutput = config();

		if (result.error) {
			this.loggerService.error('[ConfigService] Failed to read the .env file or it is missing.');
		} else {
			this.loggerService.log('[ConfigService] Configs are successfully applied ...');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
