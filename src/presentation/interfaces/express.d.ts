import { NextFunction, Request, Response } from 'express';

export declare interface Req extends Request {}

export declare type IHandler = (req: Req, res: Response, next: NextFunction) => void;

export declare type IErrorHandler = (err: any, req: Req, res: Response, next: NextFunction) => void;
