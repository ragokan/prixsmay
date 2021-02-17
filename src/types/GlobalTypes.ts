declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_SECRET: string
      SESSION_NAME: string
      MAILER_EMAIL: string
      MAILER_PASSWORD: string
      CONFIRMATION_URL: string
      MAILER_TITLE: string
      MAIL_RESET_URL: string
      DATABASE_URL: string
      TEST_DATABASE_URL: string
      REDIS_HOST: string
      REDIS_PORT: number
      REDIS_PASSWORD: string
      FRONTEND_URL: string
      testMode: string
      CLOUD_NAME: string
      API_KEY: string
      API_SECRET: string
    }
  }
}

export {}
