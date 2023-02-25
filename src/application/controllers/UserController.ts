import User from '@/domain/entities/user';
import { IUserCredentialsValidation, IUserValidationObject } from '@/domain/entities/user/types';
import UserRepository from '@/infrastructure/repositories/UserRepository';
import SharedUtils from '@/infrastructure/utils/SharedUtils';
import { IHandler } from '@/presentation/interfaces/express';
import { NotFoundException } from '../exceptions';
import BadRequestException from '../exceptions/BadRequestException';
import HttpResponse from '../utils/HttpResponse';
import JsonWebToken from '../utils/JsonWebToken';
import BaseController from './base/BaseController';

class UserController extends BaseController {
  public register: IHandler = async (req, res) => {
    const data: IUserValidationObject = req.body;

    const repo = new UserRepository();

    let dbUser = await repo.findByEmail(data.email.value);
    if (dbUser) throw new BadRequestException('User already registered!');

    dbUser = await repo.create({
      ...data,
      uid: SharedUtils.uuid(),
      email: data.email.value,
      password: await data.password.encode(),
    });

    const user = User.createFromDetails(dbUser);

    res.status(201).json(HttpResponse.ok(user, 'User Registered!'));
  };

  public login: IHandler = async (req, res) => {
    const data: IUserCredentialsValidation = req.body;

    const repo = new UserRepository();

    const dbUser = await repo.findByEmail(data.email.value);
    if (!dbUser) throw new NotFoundException("User doesn't exist!");

    const isMatch = await data.password.compare(dbUser.password);
    if (!isMatch) throw new BadRequestException('Wrong Password!');

    const token = JsonWebToken.encode({ id: dbUser.id, uid: dbUser.uid });

    const user = User.createFromDetails(dbUser);

    res.status(200).json(HttpResponse.ok({ user, token }));
  };
}

export default UserController;
