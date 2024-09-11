import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.fillter';
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { IExeptionFilter } from './errors/exeption.fillter.interface';
import { PrismaService } from './database/prisma.service';
import { ITaskController } from './tasks/task.controller.interface';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/task.service';
import { TasksRepository } from './tasks/task.repository';

export interface IBootStrapReturnType {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<ITaskController>(TYPES.TasksController).to(TasksController);
	bind<TasksService>(TYPES.TasksService).to(TasksService);
	bind<TasksRepository>(TYPES.TasksRepository).to(TasksRepository);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

function bootStrap(): IBootStrapReturnType {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootStrap();
