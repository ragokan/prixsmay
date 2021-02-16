import { Server } from "http"
import { startServer } from "../../startServer"

export const StartTest = async (): Promise<Server> => {
  process.env.DATABASE_URL = "postgresql://rago:hammer90@localhost:5432/prixsmay-test"
  process.env.testMode = "true"
  const server = await startServer()
  process.env.DATABASE_URL = "postgresql://rago:hammer90@localhost:5432/prixsmay-test"
  process.env.testMode = "true"
  return server!
}
