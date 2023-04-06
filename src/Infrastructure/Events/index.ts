import indexBuilder from '@Infrastructure/Utils/IndexBuilder';
import { EventHandler } from '@interfaces/Events';
import AppEventEmitter from './EventEmitter';
import EventNames from './EventNames';

const postfixes = ['Event.ts', 'Event.js'];
const events = indexBuilder<EventHandler>(__dirname, postfixes);

const EventEmitter = AppEventEmitter.instance;

events.forEach(event => {
  AppEventEmitter.instance.on(EventNames[event.name], event);
});

export { EventEmitter };

export default EventNames;
