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

describe("Comment Post", () => {
  const user = TestAccount
  let cookie: any
  const fakePost = CreateFakePost()
  let dbPost: IPost
  let dbComment: IComment
  const fakeComment = CreateFakeComment().text
  const updatedFakeComment = CreateFakeComment().text

  function commentValidationFunction(data: any, comment: string) {
    expect(data.message).toBeDefined()
    expect(data.success).toBe(true)
    expect(data.comment).toBeDefined()
    expect(data.comment.votes).toBeDefined()
    expect(data.comment.id).toBeDefined()
    expect(data.comment.text).toBe(comment)
    expect(data.comment.postId).toBe(dbPost.id)
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
    commentValidationFunction(data, fakeComment)

    dbComment = data.comment
    dbComment.id = parseInt(data.comment.id)
  })

  it("update comment", async () => {
    const body = {
      text: updatedFakeComment,
    }

    const responseData = await fetch(testUrl + "post/comment/" + dbComment.id, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: { cookie, "Content-Type": "application/json" },
    })
    expect(responseData.status).toBe(200)

    const data = await responseData.json()
    commentValidationFunction(data, updatedFakeComment)

    dbComment = data.comment
    dbComment.id = parseInt(data.comment.id)
  })

  it("delete comment", async () => {
    const responseData = await fetch(testUrl + "post/comment/" + dbComment.id, {
      method: "DELETE",
      headers: { cookie },
    })
    expect(responseData.status).toBe(200)
  })

  it("check database", async () => {
    const comment = await prisma.comment.findUnique({ where: { id: dbComment.id } })
    expect(comment).toBeNull()
  })

  it("delete post", async () => {
    await prisma.post.delete({ where: { id: dbPost.id } })
  })
})
