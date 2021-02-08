declare global {
  namespace NodeJS {
    interface ProcessEnv {
      sessionSecret: string;
      sessionName: string;
      mailerEmail: string;
      mailerPassword: string;
      confirmationUrl: string;
      mailerTitle: string;
      mailResetUrl: string;
      DATABASE_URL: string;
      TEST_DATABASE_URL: string;
      redisHost: string;
      redisPort: number;
      redisPassword: string;
      frontendUrl: string;
      testMode: string;
      cloud_name: string;
      api_key: string;
      api_secret: string;
    }
  }
}

export {};
