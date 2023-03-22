import BadRequestException from '@Infrastructure/Exceptions/BadRequestException';
import { plainToInstance } from 'class-transformer';
import { validate as classValidate, ValidationError, ValidatorOptions } from 'class-validator';
import { RequestHandler } from 'express';

type RequestParamsFrom = 'body' | 'query' | 'params';

const stringifyValidationErrors = (errors: Array<ValidationError>): string => {
  return errors
    .map((error: ValidationError) => {
      if (error.children?.length > 0) {
        return stringifyValidationErrors(error.children);
      }
      return Object.values(error.constraints);
    })
    .join(', ');
};

const Validate = (
  validator: any,
  params: RequestParamsFrom = 'body',
  options: ValidatorOptions = { skipMissingProperties: false, whitelist: true, forbidNonWhitelisted: true },
): RequestHandler => {
  return async (req, _res, next) => {
    try {
      const errors = await classValidate(plainToInstance(validator, req[params]), options);
      if (errors.length > 0) throw new BadRequestException(stringifyValidationErrors(errors));

      req[params] = plainToInstance(validator, req[params]);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default Validate;
