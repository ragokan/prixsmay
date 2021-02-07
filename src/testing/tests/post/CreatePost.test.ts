import { prisma } from "../../../database";
import fetch from "node-fetch";
import { testUrl } from "../../utils/TestConstants";
import { StartTest } from "../../utils/StartTest";
import { TestAccount } from "../../utils/TestAccount";
import { CreateFakePost } from "../../utils/CreateTestPost";

let server: any;
beforeAll(async () => {
  server = await StartTest();
});

afterAll(async () => {
  if (server)
    await server.close((err: any) => {
      if (err) return console.log(err);
    });
});

describe("Create Post", () => {
  const user = TestAccount;
  let cookie: any;
  const fakePost = CreateFakePost();
  let dbPost: any;

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

  it("create post", async () => {
    const responseData = await fetch(testUrl + "post", {
      method: "POST",
      body: JSON.stringify(fakePost),
      headers: { cookie, "Content-Type": "application/json" },
    });

    expect(responseData.status).toBe(201);
    const data = await responseData.json();

    dbPost = data.post;

    expect(data).toMatchObject({
      message: "Post is created successfully!",
      success: true,
      post: {
        title: fakePost.title,
        content: fakePost.content,
      },
    });
    expect(data.post.createdAt).toBeDefined();
    expect(data.post.createdAt).toBeDefined();
    expect(data.post.author).toBeDefined();
  });

  it("validate with database", async () => {
    const post = await prisma.post.findUnique({ where: { id: parseInt(dbPost.id) } });

    expect(post).toBeDefined();
    expect(post).toMatchObject({
      title: fakePost.title,
      content: fakePost.content,
    });
  });

  // it ("gets post",async () => {})

  it("delete post", async () => {
    await prisma.post.delete({ where: { id: parseInt(dbPost.id) } });
  });

  it("check database", async () => {
    const post = await prisma.post.findUnique({ where: { id: parseInt(dbPost.id) } });

    expect(post).toBeNull();
  });
});
