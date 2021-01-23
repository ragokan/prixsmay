import { prisma } from "../../../database";
import fetch from "node-fetch";
import { testUrl } from "../../utils/TestConstants";
import { StartTest } from "../../utils/StartTest";
import { CreateFakeUser } from "../../utils/CreateFakeUser";
import bcrypt from "bcryptjs";
import { TestUserType } from "../../utils/types/TestUserType";

let server: any;
beforeAll(async () => {
  server = await StartTest();
});

afterAll(async () => {
  await server.close((err: any) => {
    if (err) return console.log(err);
  });
});

describe("Get User", () => {
  const user = CreateFakeUser();
  let dbUser: TestUserType;
  let cookie: any;

  it("create user", async () => {
    const hashedPass = await bcrypt.hash(user.password, 12);
    dbUser = await prisma.user.create({ data: { ...user, isActivated: true, password: hashedPass } });
  });
  it("login user", async () => {
    const body = {
      email: user.email,
      password: user.password,
    };

    const responseData = await fetch(testUrl + "auth/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    cookie = responseData.headers.get("set-cookie");
  });

  it("get user", async () => {
    const responseData = await fetch(testUrl + "auth/user", {
      method: "GET",
      headers: { cookie },
    });
    expect(responseData.status).toBe(200);
    const response = await responseData.json();

    expect(response).toMatchObject({
      message: "User info is received successfully!",
      success: true,
      user: {
        id: dbUser.id,
        name: user.name,
        email: user.email,
        type: "user",
      },
    });
  });

  it("delete user", async () => {
    await prisma.user.delete({ where: { email: user.email } });

    const dbUser = await prisma.user.findUnique({ where: { email: user.email } });

    expect(dbUser).toBeNull();
  });
});
