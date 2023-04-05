import Configs from '@Infrastructure/Configs';
import { Logger } from '@Infrastructure/IoC/Containers';
import Symbols from '@Infrastructure/IoC/Symbols';
import { inject, injectable } from 'inversify';
import nodemailer, { Transporter } from 'nodemailer';

@injectable()
class NodeMailer {
  private transporter: Transporter;

  constructor(@inject(Symbols.Configs) configs: typeof Configs) {
    this.transporter = nodemailer.createTransport({
      service: configs.mail.service,
      auth: {
        user: configs.mail.auth.user,
        pass: configs.mail.auth.pass,
      },
    });
  }

  async send(opts: { to: string | Array<string>; subject: string; template?: string; body?: string; attachments?: any }) {
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
      Logger.error(error);
    }
  }
}

export default NodeMailer;
