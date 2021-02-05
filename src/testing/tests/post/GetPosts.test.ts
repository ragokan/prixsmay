import { prisma } from "../../../database";
import fetch from "node-fetch";
import { testUrl } from "../../utils/TestConstants";
import { StartTest } from "../../utils/StartTest";

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

describe("Get Posts", () => {
  it("gets posts and evaluate", async () => {
    const response = await fetch(testUrl + "post");

    expect(response.status).toBe(200);

    const data = await response.json();

    expect(data).toMatchObject({
      message: "Posts are received successfully!",
      success: true,
    });

    expect(Array.isArray(data.posts)).toBe(true);
  });

  it("tests posts in database", async () => {
    const posts = await prisma.post.findMany();
    expect(posts).toBeDefined();
    expect(Array.isArray(posts)).toBe(true);
  });
});
