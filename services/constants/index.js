export const CLIENT_BASE_ROUTE =
  typeof window !== 'undefined' ? window.location.origin : '';

export const ENVIRONMENT = process.env.NODE_ENV;
export const isDevelopment = ENVIRONMENT === 'development';
export const isProduction = ENVIRONMENT === 'production';
