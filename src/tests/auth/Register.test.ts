import faker from "faker";
import { prisma } from "../../database";
import fetch from "node-fetch";
import { testUrl } from "../utils/TestConstants";
import { StartTest } from "../utils/StartTest";

beforeAll(async () => {
  await StartTest();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Register", () => {
  const user = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  it("create user", async () => {
    const responseData = await fetch(testUrl + "auth/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    const response = await responseData.json();

    expect(responseData.status).toBe(201);

    expect(response).toMatchObject({
      message: "User is created successfully!",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        isActivated: false,
      },
    });

    const dbUser = await prisma.user.findUnique({ where: { email: user.email } });

    expect(dbUser).toBeDefined();
    expect(dbUser?.isActivated).toBeFalsy();
  });
  it("delete user", async () => {
    await prisma.user.delete({ where: { email: user.email } });

    const dbUser = await prisma.user.findUnique({ where: { email: user.email } });

    expect(dbUser).toBeNull();
  });
});
