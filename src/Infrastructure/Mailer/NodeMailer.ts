import Configs from '@Infrastructure/Configs';
import Symbols from '@Infrastructure/IoC/Symbols';
import { ILogger, IMailer, ISendMail } from '@interfaces/index';
import { inject, injectable } from 'inversify';
import nodemailer, { Transporter } from 'nodemailer';

@injectable()
class NodeMailer implements IMailer {
  private transporter: Transporter;

  constructor(@inject(Symbols.Configs) configs: typeof Configs, @inject(Symbols.Logger) private readonly logger: ILogger) {
    this.transporter = nodemailer.createTransport({
      service: configs.mail.service,
      auth: {
        user: configs.mail.auth.user,
        pass: configs.mail.auth.pass,
      },
    });
  }

  async send(opts: ISendMail) {
    try {
      const info = await this.transporter.sendMail({
        from: Configs.mail.from,
        to: opts.to,
        subject: opts.subject,
        text: opts.body,
        html: opts.template,
        attachments: opts.attachments,
      });

      return info;
    } catch (error) {
      this.logger.error(error);
    }
  }
}

export default NodeMailer;
