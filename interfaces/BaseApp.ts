import { Server } from 'http';
import { IDatabaseClient } from './IDatabaseClient';

export default abstract class BaseApp {
  protected port: number | string;
  protected server: Server;

  abstract start(): void;

  abstract close(): void;

  abstract connectDatabase(database: IDatabaseClient): void;

  abstract setPort(port: number | string): void;
}
