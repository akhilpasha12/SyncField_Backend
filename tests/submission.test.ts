import request from "supertest";
import app from "../src/app";
import { closeTestDB, connectTestDB } from "./setup";

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe("Submission API", () => {
  it("should create submission successfully", async () => {
    const response = await request(app)
      .post("/api/submission")
      .field("submissionId", "test-123")
      .field("name", "Test Tower")
      .field("values", JSON.stringify({ field1: "ok" }))
      .field("latitude", "12.9716")
      .field("longitude", "77.5946")
      .attach("images", Buffer.from("dummy"), "test.jpg");

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("should ignore duplicate submission", async () => {
    await request(app)
      .post("/api/submission")
      .field("submissionId", "duplicate-123")
      .field("name", "Test Tower")
      .field("values", JSON.stringify({ field1: "ok" }))
      .field("latitude", "12.9716")
      .field("longitude", "77.5946")
      .attach("images", Buffer.from("dummy"), "test.jpg");

    const duplicate = await request(app)
      .post("/api/submission")
      .field("submissionId", "duplicate-123")
      .field("name", "Test Tower")
      .field("values", JSON.stringify({ field1: "ok" }))
      .field("latitude", "12.9716")
      .field("longitude", "77.5946")
      .attach("images", Buffer.from("dummy"), "test.jpg");

    expect(duplicate.status).toBe(200);
    expect(duplicate.body.message).toBe("Duplicate submission ignored");
  });
});
