import { PrismaClient } from "@prisma/client";
import { testMode } from "./tests/testMode";

const prisma = testMode
  ? new PrismaClient({ datasources: { db: { url: process.env.TEST_DATABASE_URL } } })
  : new PrismaClient();
const { user } = prisma;

export { prisma, user as User };
