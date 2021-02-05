import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const { user, post, vote } = prisma;

export { prisma, user as User };
