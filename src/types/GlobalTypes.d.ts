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
    }
  }
}

export {};
