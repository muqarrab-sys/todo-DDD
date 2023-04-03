import { PrismaClient } from '@prisma/client';
import { DataSource } from 'typeorm';

export interface IDatabaseClient<T = any> {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  client: T;
}

export interface TypeDBClient extends IDatabaseClient<DataSource> {}
export interface PrismaDBClient extends IDatabaseClient<PrismaClient> {}
