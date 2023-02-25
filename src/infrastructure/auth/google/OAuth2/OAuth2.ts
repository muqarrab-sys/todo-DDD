import { OAuth2Client } from 'google-auth-library';
import { IOAuthConfigs } from './types';

class OAuth2 {
  private client: OAuth2Client;

  private SCOPES = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'];

  constructor(private readonly configs: IOAuthConfigs) {
    this.client = new OAuth2Client({
      clientId: configs.clientId,
      clientSecret: configs.clientSecret,
      redirectUri: configs.redirectUri,
    });
  }

  generateAuthUrl() {
    return this.client.generateAuthUrl({
      client_id: this.configs.clientId,
      redirect_uri: this.configs.redirectUri,
      scope: this.SCOPES.join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    });
  }

  async getToken(code: string) {
    return await this.client.getToken(code);
  }

  async getGoogleUser(token: string) {
    const ticket = await this.client.verifyIdToken({ idToken: token, audience: this.configs.clientId });

    return ticket.getPayload();
  }
}

export default OAuth2;
