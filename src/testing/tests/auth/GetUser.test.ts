import { prisma } from "../../../database";
import fetch from "node-fetch";
import { testUrl } from "../../utils/TestConstants";
import { StartTest } from "../../utils/StartTest";
import { TestAccount } from "../../utils/TestAccount";
import { Server } from "http";
// import bcrypt from "bcryptjs";

let server: Server;
beforeAll(async () => {
  server = await StartTest();
});

afterAll(async () => {
  if (server)
    server.close((err: any) => {
      if (err) return console.log(err);
    });
});

describe("Get User", () => {
  const user = TestAccount;
  let dbUser: any;
  let cookie: any;

  it("find user", async () => {
    // const pass = await bcrypt.hash(TestAccount.password, 12);
    // await prisma.user.create({ data: { ...TestAccount, password: pass, isActivated: true, type: "admin" } });
    dbUser = await prisma.user.findUnique({ where: { email: user.email } });
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
    const responseData = await fetch(testUrl + "user", {
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
        username: user.username,
        email: user.email,
      },
    });
  });
});
