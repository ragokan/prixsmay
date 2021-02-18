import { prisma } from "../../../../database"
import fetch from "node-fetch"
import { testUrl } from "../../../utils/TestConstants"
import { StartTest } from "../../../utils/StartTest"
import { TestAccount } from "../../../utils/TestAccount"
import { CreateFakePost } from "../../../utils/CreateTestPost"
import { IPost } from "../../../../types/PostType"

import { Server } from "http"
import { CreateFakeComment } from "../../../utils/CreateFakeComment"
import { IComment } from "../../../../types/CommentType"

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

describe("Vote Comment", () => {
  const user = TestAccount
  let cookie: any
  const fakePost = CreateFakePost()
  let dbPost: IPost
  let dbComment: IComment
  const fakeComment = CreateFakeComment().text
  let randomVote = Math.random() < 0.5 ? "up" : "down"

  function voteValidationFunction(data: any) {
    const votes = data.votes || data.post.comments[0].votes
    expect(votes).toBeDefined()
    expect(votes.length > 0).toBe(true)
    expect(votes.length).toBe(1)
    expect(votes[0].type).toBe(randomVote)
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

  it("create comment", async () => {
    const body = {
      postId: dbPost.id,
      text: fakeComment,
    }
    const responseData = await fetch(testUrl + "post/comment", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { cookie, "Content-Type": "application/json" },
    })
    expect(responseData.status).toBe(201)
    const data = await responseData.json()
    dbComment = data.comment
    dbComment.id = parseInt(data.comment.id)
  })

  it("vote post", async () => {
    const body = {
      commentId: dbComment.id,
      type: randomVote,
    }

    const responseData = await fetch(testUrl + "post/comment/vote", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { cookie, "Content-Type": "application/json" },
    })
    expect(responseData.status).toBe(200)

    const data = await responseData.json()

    voteValidationFunction(data)
  })
  it("gets post after first vote", async () => {
    const response = await fetch(testUrl + "post/" + dbPost.id)
    const data = await response.json()

    voteValidationFunction(data)
  })

  it("vote post again", async () => {
    randomVote = randomVote === "up" ? "down" : "up"

    const body = {
      commentId: dbComment.id,
      type: randomVote,
    }

    const responseData = await fetch(testUrl + "post/comment/vote", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { cookie, "Content-Type": "application/json" },
    })
    expect(responseData.status).toBe(200)

    const data = await responseData.json()

    voteValidationFunction(data)
  })
  it("vote post to remove vote", async () => {
    const body = {
      commentId: dbComment.id,
      type: randomVote,
    }

    const responseData = await fetch(testUrl + "post/comment/vote", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { cookie, "Content-Type": "application/json" },
    })
    expect(responseData.status).toBe(200)

    const data = await responseData.json()

    expect(data.votes.length > 0).toBe(false)
    expect(data.votes.length).toBe(0)
  })

  it("delete post and comment", async () => {
    await prisma.comment.delete({ where: { id: dbComment.id } })
    await prisma.post.delete({ where: { id: dbPost.id } })
  })
})
