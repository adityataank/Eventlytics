export const appConfig = {
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? "",
  API_KEY: process.env.API_KEY,
};
