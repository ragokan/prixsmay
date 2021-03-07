import { Server } from "http";
import fetch from "node-fetch";
import { prisma } from "../../../database";
import { ICommunity } from "../../../types/CommunityType";
import { CreateFakeCommunity } from "../../utils/CreateFakeCommunity";
import { StartTest } from "../../utils/StartTest";
import { TestAccount } from "../../utils/TestAccount";
import { testUrl } from "../../utils/TestConstants";

let server: Server;
beforeAll(async () => {
  server = await StartTest();
});

afterAll(async () => {
  if (server)
    server.close((err: any) => {
      if (err) return console.log(err);
    });
});

describe("Crud On cOMMUNİTY", () => {
  const user = TestAccount;
  let cookie: any;
  const fakeCommunity = CreateFakeCommunity();
  const fakeCommunityToUpdate = CreateFakeCommunity();
  let dbCommunity: ICommunity;

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

  it("create community", async () => {
    const responseData = await fetch(testUrl + "community", {
      method: "POST",
      body: JSON.stringify(fakeCommunity),
      headers: { cookie, "Content-Type": "application/json" },
    });

    expect(responseData.status).toBe(201);
    const data = await responseData.json();

    dbCommunity = data.community;
    dbCommunity.id = parseInt(data.community.id);
  });

  it("join community", async () => {
    const responseData = await fetch(testUrl + "community/join/" + dbCommunity.id, {
      method: "POST",
      headers: { cookie },
    });

    expect(responseData.status).toBe(200);
    const data = await responseData.json();
    expect(data.success).toBe(true);
  });

  it("try joining community again", async () => {
    const responseData = await fetch(testUrl + "community/join/" + dbCommunity.id, {
      method: "POST",
      headers: { cookie },
    });

    expect(responseData.status).toBe(400);
    const data = await responseData.json();
    expect(data.success).toBe(false);
  });

  it("leave community", async () => {
    const responseData = await fetch(testUrl + "community/leave/" + dbCommunity.id, {
      method: "POST",
      headers: { cookie },
    });

    expect(responseData.status).toBe(200);
    const data = await responseData.json();
    expect(data.success).toBe(true);
  });

  it("try leaving community that user isn't a member of it", async () => {
    const responseData = await fetch(testUrl + "community/leave/" + dbCommunity.id, {
      method: "POST",
      headers: { cookie },
    });

    expect(responseData.status).toBe(400);
    const data = await responseData.json();
    expect(data.success).toBe(false);
  });

  it("delete community", async () => {
    const responseData = await fetch(testUrl + "community/" + dbCommunity.id, {
      method: "DELETE",
      headers: { cookie },
    });

    expect(responseData.status).toBe(200);
  });

  it("check database", async () => {
    const community = await prisma.community.findUnique({ where: { id: dbCommunity.id } });

    expect(community).toBeNull();
  });
});
