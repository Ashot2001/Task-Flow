import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { ITaskController } from './task.controller.interface';
import { Request, Response, NextFunction } from 'express';
import { TasksService } from './task.service';
import { BaseTaskController } from '../common/base.controller';
import { ValidateMiddleware } from '../common/validate.middleware';
import {
	TaskDTO,
	TaskIdDTO,
	UpdateTaskDTO,
	TaskStatisticsDTO,
	CompletedTaskDto,
} from './task.dtos';

@injectable()
export class TasksController extends BaseTaskController implements ITaskController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.TasksService) private taskService: TasksService,
	) {
		super(loggerService);
		this.bindRoute([
			{
				path: '/createTask',
				method: 'post',
				func: this.createTask.bind(this),
				middlewares: [new ValidateMiddleware([{ class: TaskDTO, source: 'body' }])],
			},
			{
				path: '/getTask/:id',
				method: 'get',
				func: this.getTaskById.bind(this),
				middlewares: [new ValidateMiddleware([{ class: TaskIdDTO, source: 'params' }])],
			},
			{
				path: '/editTask/:id',
				method: 'put',
				func: this.updateTask.bind(this),
				middlewares: [
					new ValidateMiddleware([
						{ class: UpdateTaskDTO, source: 'body' },
						{ class: TaskIdDTO, source: 'params' },
					]),
				],
			},
			{
				path: '/getTasks',
				method: 'get',
				func: this.getTasks.bind(this),
				middlewares: [],
			},
			{
				path: '/getTaskStatistics',
				method: 'get',
				func: this.getTaskStatistics.bind(this),
				middlewares: [new ValidateMiddleware([{ class: TaskStatisticsDTO, source: 'query' }])],
			},

			{
				path: '/getCompletedTasks',
				method: 'get',
				func: this.getCompletedTasks.bind(this),
				middlewares: [new ValidateMiddleware([{ class: CompletedTaskDto, source: 'body' }])],
			},
		]);
	}

	async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.taskService.createTask(req.body);
			this.created(res, result);
		} catch (error) {
			this.loggerService.error('Error retrieving task: ' + error.message);
			next(error);
		}
	}

	async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.taskService.getTaskById(Number(req.params.id));
			if (result) {
				this.ok(res, result);
			} else {
				this.notFound(res, 'Task not found');
			}
		} catch (error) {
			this.loggerService.error('Error retrieving task: ' + error.message);
			next(error);
		}
	}

	async getTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.taskService.listTasks();
			this.ok(res, result);
		} catch (error) {
			this.loggerService.error('The defined task is missing : ' + error.message);
			next(error);
		}
	}

	async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.taskService.updateTask(Number(req.params.id), req.body);
			this.ok(res, result);
		} catch (error) {
			this.loggerService.error('Error updating task: ' + error.message);
			next(error);
		}
	}

	async getTaskStatistics(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { startDate, endDate } = req.query as { startDate: string; endDate: string };
			const parsedStartDate = new Date(startDate);
			const parsedEndDate = new Date(endDate);

			if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
				res.status(400).json({ message: 'Invalid date format provided.' });
				return;
			}

			const result = await this.taskService.getTaskStatistics(parsedStartDate, parsedEndDate);
			this.ok(res, result);
		} catch (error) {
			this.loggerService.error('Error retrieving task statistics: ' + error.message);
			next(error);
		}
	}

	async getCompletedTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { assignedMember } = req.body;
			const result = await this.taskService.getCompletedTasks(assignedMember);
			this.ok(res, result);
		} catch (error) {
			this.loggerService.error('Error retrieving completed tasks: ' + error.message);
			next(error);
		}
	}
}
