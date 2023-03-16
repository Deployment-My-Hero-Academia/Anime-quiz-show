const mongoose = require("mongoose");
const request = require("supertest");
const index = require("./index");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/users/", () => {
  it("should return all users", async () => {
    const res = await request(index).get("/api/users/");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
describe("GET /api/users/:id", () => {
  it("should return a user", async () => {
    const res = await request(index).get(
      "/api/users/640367c8fa1f51b899147034"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe("Big");
  });
});

describe("POST /api/users/register", () => {
  it("should create a user", async () => {
    const res = await request(index).post("/api/users/create").send({
      firstName: "Sheree",
      lastName: "Edmund",
      email: "esee@gmail.com",
      password: "testing"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.firstName).toBe("sheree");
  });
});

describe("PUT /api/users/:id", () => {
  it("should update a user", async () => {
    const res = await request(index)
      .patch("/api/users/640367c8fa1f51b899147034")
      .send({
        firstName: "Bigger",
       
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(104);
  });
});

// describe("DELETE /api/products/:id", () => {
//   it("should delete a product", async () => {
//     const res = await request(index).delete(
//       "/api/products/6331abc9e9ececcc2d449e44"
//     );
//     expect(res.statusCode).toBe(200);
//   });
// });