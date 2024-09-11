import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { ITaskRepository } from './task.repository.interface';
import { Task, Prisma } from '@prisma/client';

@injectable()
export class TasksRepository implements ITaskRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
		return this.prismaService.client.task.create({
			data: {
				title: data.title,
				description: data.description,
				dueDate: new Date(data.dueDate).toISOString(),
				priority: data.priority,
				assignedMember: data.assignedMember,
				status: data.status || 'PENDING',
			},
		});
	}

	async getTaskById(id: number): Promise<Task | null> {
		return this.prismaService.client.task.findUnique({
			where: { id },
		});
	}

	async getTasks(): Promise<Task[]> {
		return this.prismaService.client.task.findMany();
	}

	async updateTask(id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
		if (data.status === 'COMPLETED' && !data.completionDate) {
			data.completionDate = new Date();
		}

		return this.prismaService.client.task.update({
			where: { id },
			data,
		});
	}

	async getCompletedTasks(memberId: string): Promise<Task[]> {
		return this.prismaService.client.task.findMany({
			where: {
				status: 'COMPLETED',
				assignedMember: memberId,
			},
		});
	}

	async getTaskStatistics(startDate: Date, endDate: Date): Promise<any> {
		const completedTasks = await this.prismaService.client.task.findMany({
			where: {
				status: 'COMPLETED',
				completionDate: {
					gte: startDate,
					lte: endDate,
				},
			},
			select: {
				createdAt: true,
				completionDate: true,
			},
		});
		const completionTimes = completedTasks.map(
			(task) => task.completionDate.getTime() - task.createdAt.getTime(),
		);

		const averageCompletionTime =
			completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length;

		return {
			count: completedTasks.length,
			averageCompletionTime: averageCompletionTime,
		};
	}
}
