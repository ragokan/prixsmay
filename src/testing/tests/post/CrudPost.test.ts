import { prisma } from "../../../database";
import fetch from "node-fetch";
import { testUrl } from "../../utils/TestConstants";
import { StartTest } from "../../utils/StartTest";
import { TestAccount } from "../../utils/TestAccount";
import { CreateFakePost } from "../../utils/CreateTestPost";
import { IPost } from "../../../types/PostType";

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

describe("Crud On Post", () => {
  const user = TestAccount;
  let cookie: any;
  const fakePost = CreateFakePost();
  const fakePostToUpdate = CreateFakePost();
  let dbPost: IPost;

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
    dbPost.id = parseInt(data.post.id);

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

  it("validate with database before update", async () => {
    const post = await prisma.post.findUnique({ where: { id: dbPost.id } });
    if (post) dbPost = post;

    expect(post).toBeDefined();
    expect(post).toMatchObject({
      title: fakePost.title,
      content: fakePost.content,
    });
  });

  it("gets post before update", async () => {
    const response = await fetch(testUrl + "post/" + dbPost.id);
    expect(response.status).toBe(200);

    const data = await response.json();

    expect(data).toMatchObject({
      message: "Post is received successfully!",
      success: true,
    });
    expect(data.post).toMatchObject({
      authorId: dbPost.authorId,
      content: dbPost.content,
      id: dbPost.id,
      title: dbPost.title,
    });
  });

  it("updates post", async () => {
    const responseData = await fetch(testUrl + "post/" + dbPost.id, {
      method: "PATCH",
      body: JSON.stringify(fakePostToUpdate),
      headers: { cookie, "Content-Type": "application/json" },
    });

    expect(responseData.status).toBe(200);
    const data = await responseData.json();

    dbPost = data.post;
    dbPost.id = parseInt(data.post.id);

    expect(data).toMatchObject({
      message: "Post is updated successfully!",
      success: true,
      post: {
        title: fakePostToUpdate.title,
        content: fakePostToUpdate.content,
      },
    });
    expect(data.post.createdAt).toBeDefined();
    expect(data.post.createdAt).toBeDefined();
    expect(data.post.author).toBeDefined();
  });

  it("gets post after update", async () => {
    const response = await fetch(testUrl + "post/" + dbPost.id);
    expect(response.status).toBe(200);

    const data = await response.json();

    expect(data).toMatchObject({
      message: "Post is received successfully!",
      success: true,
    });
    expect(data.post).toMatchObject({
      authorId: dbPost.authorId,
      content: dbPost.content,
      id: dbPost.id,
      title: dbPost.title,
    });
  });

  it("validate with database after update", async () => {
    const post = await prisma.post.findUnique({ where: { id: dbPost.id } });
    if (post) dbPost = post;

    expect(post).toBeDefined();
    expect(post).toMatchObject({
      title: fakePostToUpdate.title,
      content: fakePostToUpdate.content,
    });
  });

  // TODO : Bunu Router Ile Sil
  it("delete post", async () => {
    const responseData = await fetch(testUrl + "post/" + dbPost.id, {
      method: "DELETE",
      headers: { cookie },
    });

    expect(responseData.status).toBe(200);
    const data = await responseData.json();

    expect(data).toMatchObject({ message: "Post is deleted successfully!", success: true });
  });

  it("gets post after delete", async () => {
    const response = await fetch(testUrl + "post/" + dbPost.id);
    expect(response.status).toBe(404);

    const data = await response.json();

    expect(data).toMatchObject({ message: "No post is found with this id!", success: false });
  });

  it("check database", async () => {
    const post = await prisma.post.findUnique({ where: { id: dbPost.id } });

    expect(post).toBeNull();
  });
});
