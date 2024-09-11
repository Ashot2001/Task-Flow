import express, { Express } from 'express';
import { Server } from 'node:http';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { json } from 'body-parser';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { IExeptionFilter } from './errors/exeption.fillter.interface';
import { PrismaService } from './database/prisma.service';
import { TasksController } from './tasks/tasks.controller';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.LoggerService) private logger: ILogger,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.TasksController) private tasksController: TasksController,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = Number(this.configService.get('PORT')) || 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/tasks', this.tasksController.router);
	}

	useExeptionFillters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFillters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server is running at http://localhost:${this.port}`);
	}
}
