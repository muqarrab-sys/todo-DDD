import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'todo-ddd',
});

export default logger;
