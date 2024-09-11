// src/services/TaskService.ts
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { TaskDTO } from './task.dtos';
import { ITaskRepository } from './task.repository.interface';

@injectable()
export class TasksService {
	constructor(@inject(TYPES.TasksRepository) private taskRepository: ITaskRepository) {}

	async createTask(taskDto: TaskDTO) {
		return this.taskRepository.createTask(taskDto);
	}

	async getTaskById(id: number) {
		return this.taskRepository.getTaskById(id);
	}

	async updateTask(id: number, taskDto: TaskDTO) {
		return this.taskRepository.updateTask(id, taskDto);
	}

	async listTasks() {
		return this.taskRepository.getTasks();
	}
	async getTaskStatistics(startDate: Date, endDate: Date): Promise<any> {
		return this.taskRepository.getTaskStatistics(startDate, endDate);
	}
	async getCompletedTasks(memberId: string) {
		return this.taskRepository.getCompletedTasks(memberId);
	}
}
