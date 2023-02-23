export const environments = {
  dev: 'development',
  prod: 'production',
  test: 'test',
};

export const isDevelopment = () => process.env.NODE_ENV === environments.dev;
export const isProduction = () => process.env.NODE_ENV === environments.prod;
export const isTest = () => process.env.NODE_ENV === environments.test;
