import { Logger, Mailer, Slack } from '@Infrastructure/IoC/Containers';
import { EventHandler, IUserCreatedEvent } from '@interfaces/Events';

const UserCreatedEvent: EventHandler = async (eventObj: IUserCreatedEvent) => {
  try {
    await Mailer.send({
      to: eventObj.email,
      subject: 'You have been registered!',
      body: 'You have been registered',
    });

    await Slack.notify({
      text: `A user is created.\n\nName: ${eventObj.name}\nEmail: ${eventObj.email}`,
      icon_url: 'https://picsum.photos/id/237/200/300',
      username: 'System',
    });
  } catch (error) {
    Logger.error('Failed to send notification on user creation', error);
  }
};

export default UserCreatedEvent;
