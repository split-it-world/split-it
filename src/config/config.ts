import { ConfigProps } from 'src/interfaces/config.interface';

export const config = (): ConfigProps => {
  return {
    port: parseInt(process.env.PORT, 10) || 8080,
    api: {
      apiUrl: process.env.API_URL,
      httpTimeout: 1000,
    },
    mongodb: {
      database: {
        connectionString:
          `mongodb+srv://${process.env.DB_HOST}` || 'mongodb://localhost:27017',
        dbName: process.env.DB_NAME || 'local',
        user: process.env.DB_USER || 'admin-singhal',
        pass: process.env.DB_PASS || 'admin',
      },
    },
  };
};
