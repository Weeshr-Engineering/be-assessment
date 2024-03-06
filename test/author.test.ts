import request from "supertest";
import { app, server } from "../src/main";
import "dotenv/config";
import { faker } from "@faker-js/faker";


let createdAuthorId;

describe("Authors API", () => {
  it("Post /authors - It can register an Author", async () => {
    const newAuthor = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: faker.person.middleName(),
    };
    const result = await request(app).post("/api/v1/authors/").send(newAuthor);
    expect(result.statusCode).toEqual(201);
    createdAuthorId = result.body.data.id;
  });

  it("Get /authors - It can get all Authors", async () => {
    const result = await request(app)
      .get("/api/v1/authors/")
    expect(result.statusCode).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
  });

  it("Get /author/:id - It can get an Author by ID", async () => {
    const result = await request(app)
      .get(`/api/v1/author/${createdAuthorId}`)
    expect(result.statusCode).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
  });

  it("Delete /author/:id - It can delete an Author by ID", async () => {
    const result = await request(app)
      .delete(`/api/v1/author/${createdAuthorId}`)
    expect(result.statusCode).toEqual(204);
  });

  afterAll(async () => {
    server.close();
  });
});