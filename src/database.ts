import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const { user: User, post: Post, vote: Vote } = prisma;

export { prisma, User, Post, Vote };
