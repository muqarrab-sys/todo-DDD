import { IntegrationEvent, EventName } from '@interfaces/Events';
import { EventEmitter as NEventEmitter } from 'stream';

export default class AppEventEmitter {
  static instance = new AppEventEmitter();

  private emitter: NEventEmitter;

  constructor() {
    if (AppEventEmitter.instance != null) {
      return AppEventEmitter.instance;
    }

    this.initialize();
  }

  private initialize() {
    this.emitter = new NEventEmitter();
  }

  public on(event: EventName, cb: (args: IntegrationEvent) => any) {
    this.emitter.on(event, cb);
  }

  public emit<T = IntegrationEvent>(event: EventName, eventObj: T) {
    this.emitter.emit(event, eventObj);
  }
}
