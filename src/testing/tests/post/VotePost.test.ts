import { prisma } from "../../../database"
import fetch from "node-fetch"
import { testUrl } from "../../utils/TestConstants"
import { StartTest } from "../../utils/StartTest"
import { TestAccount } from "../../utils/TestAccount"
import { CreateFakePost } from "../../utils/CreateTestPost"
import { IPost } from "../../../types/PostType"

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

describe("Vote Post", () => {
  const user = TestAccount
  let cookie: any
  const fakePost = CreateFakePost()
  const fakePostToUpdate = CreateFakePost()
  let randomVote = Math.random() < 0.5 ? "up" : "down"
  let dbPost: IPost

  function postValidation(data: any) {
    expect(data.post.votes).toBeDefined()
    expect(data.post.votes.length > 0).toBe(true)
    expect(data.post.votes.length).toBe(1)
    expect(data.post.votes[0].type).toBe(randomVote)
  }

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

  it("create post", async () => {
    const responseData = await fetch(testUrl + "post", {
      method: "POST",
      body: JSON.stringify(fakePost),
      headers: { cookie, "Content-Type": "application/json" },
    })
    const data = await responseData.json()
    dbPost = data.post
    dbPost.id = parseInt(data.post.id)
  })

  it("vote post", async () => {
    const body = {
      postId: dbPost.id,
      type: randomVote,
    }

    const responseData = await fetch(testUrl + "post/vote", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { cookie, "Content-Type": "application/json" },
    })
    expect(responseData.status).toBe(200)

    const data = await responseData.json()

    postValidation(data)
  })
  it("gets post after first vote", async () => {
    const response = await fetch(testUrl + "post/" + dbPost.id)
    const data = await response.json()

    postValidation(data)
  })

  it("vote post again", async () => {
    randomVote = randomVote === "up" ? "down" : "up"

    const body = {
      postId: dbPost.id,
      type: randomVote,
    }

    const responseData = await fetch(testUrl + "post/vote", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { cookie, "Content-Type": "application/json" },
    })
    expect(responseData.status).toBe(200)

    const data = await responseData.json()

    postValidation(data)
  })
  it("vote post to remove vote", async () => {
    const body = {
      postId: dbPost.id,
      type: randomVote,
    }

    const responseData = await fetch(testUrl + "post/vote", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { cookie, "Content-Type": "application/json" },
    })
    expect(responseData.status).toBe(200)

    const data = await responseData.json()

    expect(data.post.votes.length > 0).toBe(false)
    expect(data.post.votes.length).toBe(0)
  })

  it("delete post", async () => {
    await prisma.post.delete({ where: { id: dbPost.id } })
  })
})
