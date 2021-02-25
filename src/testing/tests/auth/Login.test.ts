import { prisma } from "../../../database"
import fetch from "node-fetch"
import { testUrl } from "../../utils/TestConstants"
import { StartTest } from "../../utils/StartTest"
import { TestAccount } from "../../utils/TestAccount"
import { Server } from "http"

let server: Server
beforeAll(async () => {
  server = await StartTest()
})

afterAll(async () => {
  if (server)
    server.close((err: any) => {
      if (err) return console.log(err)
    })
})

describe("Login", () => {
  let user = TestAccount
  let dbUser: any

  it("get user", async () => {
    dbUser = await prisma.user.findUnique({ where: { email: user.email } })
  })

  it("login user", async () => {
    const body = {
      email: user.email,
      password: user.password,
    }

    const responseData = await fetch(testUrl + "auth/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })

    const response = await responseData.json()

    expect(responseData.status).toBe(200)

    expect(response).toMatchObject({
      message: "User is logged in successfully!",
      success: true,
      user: {
        id: dbUser.id,
        username: user.username,
        email: user.email,
      },
    })
  })
})
