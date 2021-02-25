import { Server } from "http"
import fetch from "node-fetch"
import { prisma } from "../../../database"
import { ICommunity } from "../../../types/CommunityType"
import { CreateFakeCommunity } from "../../utils/CreateFakeCommunity"
import { StartTest } from "../../utils/StartTest"
import { TestAccount } from "../../utils/TestAccount"
import { testUrl } from "../../utils/TestConstants"

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

describe("Crud On cOMMUNİTY", () => {
  const user = TestAccount
  let cookie: any
  const fakeCommunity = CreateFakeCommunity()
  const fakeCommunityToUpdate = CreateFakeCommunity()
  let dbCommunity: ICommunity

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
    cookie = responseData.headers.get("set-cookie")
  })

  it("create community", async () => {
    const responseData = await fetch(testUrl + "community", {
      method: "POST",
      body: JSON.stringify(fakeCommunity),
      headers: { cookie, "Content-Type": "application/json" },
    })

    expect(responseData.status).toBe(201)
    const data = await responseData.json()

    dbCommunity = data.community
    dbCommunity.id = parseInt(data.community.id)

    expect(data).toMatchObject({
      message: "Community is created successfully!",
      success: true,
      community: {
        name: fakeCommunity.name,
        description: fakeCommunity.description,
      },
    })
  })

  it("validate with database before update", async () => {
    const community = await prisma.community.findUnique({ where: { id: dbCommunity.id } })
    if (community) dbCommunity = community

    expect(community).toBeDefined()
    expect(community).toMatchObject({
      name: fakeCommunity.name,
      description: fakeCommunity.description,
    })
  })

  it("gets community before update", async () => {
    const response = await fetch(testUrl + "community/" + dbCommunity.id)
    expect(response.status).toBe(200)

    const data = await response.json()

    expect(data).toMatchObject({
      message: "Community is received successfully!",
      success: true,
    })
    expect(data.community).toMatchObject({
      name: dbCommunity.name,
      description: dbCommunity.description,
    })
  })

  it("updates community", async () => {
    const responseData = await fetch(testUrl + "community/" + dbCommunity.id, {
      method: "PATCH",
      body: JSON.stringify(fakeCommunityToUpdate),
      headers: { cookie, "Content-Type": "application/json" },
    })

    expect(responseData.status).toBe(200)
    const data = await responseData.json()

    dbCommunity = data.community
    dbCommunity.id = parseInt(data.community.id)

    expect(data).toMatchObject({
      message: "Community is updated successfully!",
      success: true,
      community: {
        name: fakeCommunityToUpdate.name,
        description: fakeCommunityToUpdate.description,
      },
    })
  })

  it("gets community after update", async () => {
    const response = await fetch(testUrl + "community/" + dbCommunity.id)
    expect(response.status).toBe(200)

    const data = await response.json()

    expect(data).toMatchObject({
      message: "Community is received successfully!",
      success: true,
    })
    expect(data.community).toMatchObject({
      name: dbCommunity.name,
      description: dbCommunity.description,
      id: dbCommunity.id,
    })
  })

  it("validate with database after update", async () => {
    const community = await prisma.community.findUnique({ where: { id: dbCommunity.id } })
    if (community) dbCommunity = community

    expect(community).toBeDefined()
    expect(community).toMatchObject({
      name: fakeCommunityToUpdate.name,
      description: fakeCommunityToUpdate.description,
    })
  })

  // TODO : Bunu Router Ile Sil
  it("delete community", async () => {
    const responseData = await fetch(testUrl + "community/" + dbCommunity.id, {
      method: "DELETE",
      headers: { cookie },
    })

    expect(responseData.status).toBe(200)
    const data = await responseData.json()

    expect(data).toMatchObject({ message: "Community is deleted successfully!", success: true })
  })

  it("gets community after delete", async () => {
    const response = await fetch(testUrl + "community/" + dbCommunity.id)
    expect(response.status).toBe(404)

    const data = await response.json()

    expect(data).toMatchObject({ message: "No community is found with this id!", success: false })
  })

  it("check database", async () => {
    const community = await prisma.community.findUnique({ where: { id: dbCommunity.id } })

    expect(community).toBeNull()
  })
})
