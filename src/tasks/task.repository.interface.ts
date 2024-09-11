import { Task, Prisma } from '@prisma/client';

export interface ITaskRepository {
	createTask: (data: Prisma.TaskCreateInput) => Promise<Task>;
	getTaskById: (id: number) => Promise<Task | null>;
	getTasks: () => Promise<Task[]>;
	updateTask: (id: number, data: Prisma.TaskUpdateInput) => Promise<Task>;
	getTaskStatistics: (startDate: Date, endDate: Date) => Promise<any[]>;
	getCompletedTasks: (memberId: string) => Promise<any[]>;
}
