export { IDatabaseClient } from '@interfaces/IDatabaseClient';
import BLogger from 'bunyan';
import { JwtPayload as JsonWebTokenPayload } from 'jsonwebtoken';
import { Logger as WLogger } from 'winston';
import { IDatabaseClient } from '.';

export declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type IdObject = {
  uid: string;
};

export enum Env {
  'DEV' = 'development',
  'PROD' = 'production',
  'TEST' = 'test',
}

export interface JwtPayload extends JsonWebTokenPayload {
  id?: number;
}

export type ILogger = WLogger | BLogger;

export interface ISendMail {
  to: string | Array<string>;
  subject: string;
  template?: string;
  body?: string;
  attachments?: any;
}

export interface IMailer {
  send(opts: ISendMail): Promise<any>;
}

export interface IApplication {
  start(): void;
  close(): void;
  setPort(port: number | string): void;
  connectDatabase(database: IDatabaseClient): void;
}
