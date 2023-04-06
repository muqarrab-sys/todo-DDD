import { Logger, Mailer } from '@Infrastructure/IoC/Containers';
import { EventHandler, ITodoCreatedEvent } from '@interfaces/Events';

const TodoCreatedEvent: EventHandler = async (eventObj: ITodoCreatedEvent) => {
  try {
    await Mailer.send({
      to: eventObj.email,
      subject: 'Your Todo is created!',
      body: `Your todo is created successfully.\nTodo: ${eventObj.title}\nDescription: ${eventObj.description}`,
    });
  } catch (error) {
    Logger.error('failed to send notification email on todo creation', error);
  }
};

export default TodoCreatedEvent;
