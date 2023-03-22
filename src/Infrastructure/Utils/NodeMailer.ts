import Configs from '@Infrastructure/Configs';
import nodemailer, { TestAccount, Transporter } from 'nodemailer';
import logger from './logger';

type configs = typeof Configs.mail;

class NodeMailer {
  private transporter: Transporter;

  constructor(configs: configs) {
    this.transporter = nodemailer.createTransport({
      service: configs.service,
      auth: {
        user: configs.auth.user,
        pass: configs.auth.pass,
      },
    });
  }

  async send(opts: { to: string | Array<string>; subject: string; template?: string; body?: string; attachments?: any }) {
    try {
      const info = await this.transporter.sendMail({
        from: Configs.mail.from,
        to: opts.to,
        text: opts.body,
        html: opts.template,
        attachments: opts.attachments,
      });

      return info;
    } catch (error) {
      logger.error(error);
    }
  }

  static create() {
    return new NodeMailer(Configs.mail);
  }
}

export default NodeMailer;
