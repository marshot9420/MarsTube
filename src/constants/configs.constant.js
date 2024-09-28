export const CONFIGS = {
  NODE_ENV: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
  },
  HOST: process.env.HOST || 'http://localhost',
  PORT: process.env.PORT || 3000,
  DEV_MODE: process.env.NODE_ENV === 'development',
}
