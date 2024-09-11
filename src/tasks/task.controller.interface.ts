import { NextFunction, Request, Response } from 'express';

export interface ITaskController {
	createTask: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getTaskById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getTasks: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	updateTask: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
