import { startServer } from "../../startServer";

export const StartTest = async () => {
  process.env.DATABASE_URL = "postgresql://postgres:hammer90@localhost:5432/prixsmay-testing";
  await startServer();
};
