export type EventName = string | symbol;

export type EventHandler = (eventObj: IntegrationEvent) => void;

export interface IntegrationEvent {
  ocurredAt: Date;
}

export interface IUserCreatedEvent extends IntegrationEvent {
  name: string;
  email: string;
}

export interface ITodoCreatedEvent extends IntegrationEvent {
  email: string;
  title: string;
  description: string;
}
