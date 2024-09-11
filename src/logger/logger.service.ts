// import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
// import { ILoggerConfig, ILogger } from './logger.interface';
// import { injectable } from 'inversify';
// import 'reflect-metadata';

// @injectable()
// export class LoggerService implements ILogger {
// 	private logger: WinstonLogger;

// 	constructor({ level = 'info', filename = 'app.log' }: ILoggerConfig = {}) {
// 		try {
// 			this.logger = createLogger({
// 				level: level,
// 				format: format.combine(
// 					format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
// 					format.errors({ stack: true }),
// 					format.splat(),
// 					format.json(),
// 				),
// 				transports: [
// 					new transports.File({ filename: 'errors.log', level: 'error' }),
// 					new transports.File({ filename }),
// 					new transports.Console({
// 						format: format.combine(format.colorize(), format.simple()),
// 					}),
// 				],
// 			});
// 		} catch (error) {
// 			console.error('Failed to initialize LoggerService:', error);
// 			throw new Error('AAAA');
// 		}
// 	}

// 	public log(message: string, level: string = 'info') {
// 		this.logger.log(level, message);
// 	}

// 	public info(message: string) {
// 		this.logger.info(message);
// 	}

// 	public error(message: string) {
// 		this.logger.error(message);
// 	}

// 	public warn(message: string) {
// 		this.logger.warn(message);
// 	}
	
// 	public test(message: string) {
// 		console.log(`[TEST LOG]: ${message}`);
// 	}
// }



import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import { ILoggerConfig, ILogger } from './logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';
import 'colors';  

@injectable()
export class LoggerService implements ILogger {
    private logger: WinstonLogger;

    constructor({ level = 'info', filename = 'app.log' }: ILoggerConfig = {}) {
        try {
            this.logger = createLogger({
                level: level,
                format: format.combine(
                    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    format.errors({ stack: true }),
                    format.splat(),
                    format.json(),
                ),
                transports: [
                    new transports.File({ filename: 'errors.log', level: 'error' }),
                    new transports.File({ filename }),
                    new transports.Console({
                        format: format.combine(format.colorize(), format.simple()),
                    }),
                ],
            });
        } catch (error) {
            console.error('Failed to initialize LoggerService:', error);
            throw new Error('AAAA');
        }
    }

    public log(message: string, level: string = 'info') {
        this.logger.log(level, message);
    }

    public info(message: string) {
        this.logger.info(message);
    }

    public error(message: string) {
        this.logger.error(message);
    }

    public warn(message: string) {
        this.logger.warn(message);
    }
    
    public test(message: string) {
        console.log(`[TEST LOG]: ${message}`.bgGreen.black); 
    }
}

