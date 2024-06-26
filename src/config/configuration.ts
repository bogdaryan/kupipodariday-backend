export const {
  PORT = 3001,
  POSTGRES_HOST,
  POSTGRES_PORT = 5432,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  SYNCHRONIZE,
  SECRET_SESSION_KEY,
} = process.env;

export default () => ({
  server: {
    port: PORT,
  },
  database: {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    user: POSTGRES_USER,
    db: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
  },
  jwt: {
    secret: SECRET_SESSION_KEY,
    ttl: 100,
  },
});
