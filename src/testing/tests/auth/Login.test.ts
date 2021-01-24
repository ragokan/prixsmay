import { prisma } from "../../../database";
import fetch from "node-fetch";
import { testUrl } from "../../utils/TestConstants";
import { StartTest } from "../../utils/StartTest";
import { TestAccount } from "../../utils/TestAccount";
import { TestUserType } from "../../utils/types/TestUserType";
import { times } from "lodash";

let server: any;
beforeAll(async () => {
  server = await StartTest();
});

afterAll(async () => {
  await server.close((err: any) => {
    if (err) return console.log(err);
  });
});

describe("Login", () => {
  let user = TestAccount;
  let dbUser: any;

  it("get user", async () => {
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

    const response = await responseData.json();

    expect(responseData.status).toBe(200);

    expect(response).toMatchObject({
      message: "User is logged in successfully!",
      success: true,
      user: {
        id: dbUser.id,
        name: user.name,
        email: user.email,
        type: "user",
      },
    });
  });
});
