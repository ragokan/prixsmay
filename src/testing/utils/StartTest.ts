import { startServer } from "../../startServer";

export const StartTest = async () => {
  process.env.DATABASE_URL = "postgresql://postgres:hammer90@localhost:5432/prixsmay-test";
  process.env.testMode = "true";
  const server = await startServer();
  return server;
};
