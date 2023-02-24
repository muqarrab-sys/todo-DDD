import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

export declare type IHandler = (req: Request<ParamsDictionary, any, any, any>, res: Response, next: NextFunction) => void;

export declare type IErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => void;
