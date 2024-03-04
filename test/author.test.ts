import request from "supertest";
import { app, server } from "../src/app";
import "dotenv/config";
import { faker } from "@faker-js/faker";

// Stores the email and password to reuse in the login after registration
let testCredentials = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

let createdAuthorId;
let dummyAuthor;
let token;

async function obtainToken() {
  let response = await request(app)
    .post("/api/v1/login")
    .send({ email: testCredentials.email, password: testCredentials.password });

  // If login fails, register and then login again
  if (response.status !== 200) {
    await request(app).post("/api/v1/register").send({
      email: testCredentials.email,
      password: testCredentials.password,
      fullname: faker.internet.displayName(),
      confirmPassword: testCredentials.password,
      bio: faker.lorem.paragraph(),
    });

    // Attempt to login again after registration
    response = await request(app).post("/api/v1/login").send({
      email: testCredentials.email,
      password: testCredentials.password,
    });

    dummyAuthor = response.body.data.id;
  }

  return response.body.data.token;
}

async function deleteDummyAuthor(dummyAuthor) {
  await request(app)
    .delete(`/api/v1/author/${dummyAuthor}`)
    .set("Authorization", `Bearer ${token}`);
  return true;
}

describe("Authors API", () => {
  // Dynamically obtain a token before running tests
  beforeAll(async () => {
    token = await obtainToken();
  });

  it("Get /authors - It can get all Authors", async () => {
    const result = await request(app)
      .get("/api/v1/authors/")
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
  });

  it("Post /register - It can register an Author", async () => {
    const newAuthor = {
      email: faker.internet.email(),
      password: testCredentials.password,
      confirmPassword: testCredentials.password,
      fullname: faker.internet.displayName(),
      bio: faker.lorem.paragraph(),
    };
    const result = await request(app).post("/api/v1/register/").send(newAuthor);
    expect(result.statusCode).toEqual(201);
    createdAuthorId = result.body.data.id;
  });

  it("Get /author/:id - It can get an Author by ID", async () => {
    const result = await request(app)
      .get(`/api/v1/author/${createdAuthorId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
  });

  it("Delete /author/:id - It can delete an Author by ID", async () => {
    const result = await request(app)
      .delete(`/api/v1/author/${createdAuthorId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(result.statusCode).toEqual(204);
  });

  afterAll(async () => {
    const deleted = await deleteDummyAuthor(dummyAuthor);
    server.close();
  });
});
