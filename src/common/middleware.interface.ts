import { NextFunction, Request, Response, Router } from 'express';

export interface IMiddleWare {
	execute: (req: Request, res: Response, next: NextFunction) => void;
}
