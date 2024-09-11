import { Task } from '@prisma/client';
import { TaskDTO, TaskStatisticsDTO } from './task.dtos';

export interface ITaskService {
	createTask(taskDto: TaskDTO): Promise<Task>;
	getTaskById(id: number): Promise<Task | null>;
	updateTask(id: number, taskDto: TaskDTO): Promise<Task>;
	listTasks(): Promise<Task[]>;
	getCompletedTasks: ({ startDate, endDate }: TaskStatisticsDTO) => Promise<any>;
}
