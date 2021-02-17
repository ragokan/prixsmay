import { prisma } from "../../../database"
import fetch from "node-fetch"
import { testUrl } from "../../utils/TestConstants"
import { StartTest } from "../../utils/StartTest"
import { CreateFakeUser } from "../../utils/CreateFakeUser"

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

describe("Register", () => {
  const user = CreateFakeUser()

  it("create user", async () => {
    const responseData = await fetch(testUrl + "auth/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
    const response = await responseData.json()

    expect(responseData.status).toBe(201)

    expect(response).toMatchObject({
      message: "User is created successfully!",
      success: true,
      user: {
        username: user.username,
        email: user.email,
        isActivated: false,
      },
    })

    const dbUser = await prisma.user.findUnique({ where: { email: user.email } })

    expect(dbUser).toBeDefined()
    expect(dbUser?.isActivated).toBeFalsy()
  })
  it("delete user", async () => {
    const profile = await prisma.profile.findFirst({ where: { user: { email: user.email } } })
    await prisma.profile.delete({ where: { id: profile?.id } })
    await prisma.user.delete({ where: { email: user.email } })

    const dbUser = await prisma.user.findUnique({ where: { email: user.email } })

    expect(dbUser).toBeNull()
  })
})
