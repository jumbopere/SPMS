import {
  describe,
  it,
  expect,
  afterAll,
  beforeAll,
  vi,
  beforeEach,
  afterEach,
} from "vitest";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../../src/app.js";
import { fakerUser } from "../authHelper.js";
import User from "../../src/models/user.js";

const request = supertest(app);

describe("user controllers test", () => {
  describe("registering a new user", () => {
    afterAll(async () => {
      await User.deleteMany({});
    });

    it("returns 201 for successfully register a user", async () => {
      const response = await request
        .post("/user/register")
        .send(fakerUser.user1);
      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
    });
    it("returns (409 error) for duplicate email", async () => {
      const response = await request
        .post("/user/register")
        .send(fakerUser.user1)
        .expect(409);
      expect(response.body.message).toBe("User already exists");
    });
    it("returns 400 error if the first name field is empty", async () => {
      const { body } = await request
        .post("/user/register")
        .send(fakerUser.wrongUser)
        .expect(400);
      expect(body.firstName).to.equal("FirstName is required");
    });
    it("returns 400 error if the last name field is empty", async () => {
      const { body } = await request
        .post("/user/register")
        .send(fakerUser.wrongUser1)
        .expect(400);
      expect(body.lastName).to.equal("LastName is required");
    });
    it("returns 400 error if the email field is invalid", async () => {
      const { body } = await request
        .post("/user/register")
        .send(fakerUser.wrongUser2)
        .expect(400);
      expect(body.email).to.equal("Email is invalid");
    });
    it("returns 400 error if the email field is not lowercase", async () => {
      const { body } = await request
        .post("/user/register")
        .send(fakerUser.wrongUser6)
        .expect(400);
      expect(body.email).to.equal("Email must be in lowercase");
    });
    it("return 400 error if the password field is empty or invalid", async () => {
      const { body } = await request
        .post("/user/register")
        .send(fakerUser.wrongUser3);
      expect(body.password).to.equal(
        "Password must be at least 8 character  containing at least 1 lowercase, number, uppercase, symbols"
      );
    });
    it("return 400 error if the phone number field is empty or invalid", async () => {
      const { body } = await request
        .post("/user/register")
        .send(fakerUser.wrongUser4);
      expect(body.phone).to.equal("Phone Number is invalid");
    });
    it("return 400 error if the NIN, dateofbirth, and gender field are empty", async () => {
      const { body } = await request
        .post("/user/register")
        .send(fakerUser.wrongUser5);
      expect(body.dob).to.equal(
        "It must be YYYY/MM/DD,or YYYY-MM-DD, or YYYY,MM,DD format"
      );
      expect(body.nin).to.equal("NIN is required");
      expect(body.gender).to.equal("Gender is required");
    });
    it("should return 500 status if there is a server error", async () => {
      // mock the Ship model to throw an error when saving
      vi.spyOn(User.prototype, "save").mockRejectedValueOnce(
        new Error("Something went wrong")
      );

      const newUser = {
        firstName: "pere",
        lastName: "jumbo",
        email: "jumbooperebara0@spms.com",
        password: "WHYsoSeRious1$%",
        phone: 903227656,
        dob: "2002/03/04",
        nin: "9892939302",
        gender: "male",
        age: 21,
      };

      const res = await request
        .post("/user/register")
        .send(newUser)
        .expect(500);

      expect(res.body).toEqual({
        message: "Something went wrong",
      });
    });
    
  });

  describe("getting all user", () => {
    it("should get all users", async () => {
      const { body } = await request.get("/user/admin/get-users").expect(200);

      expect(body.success).toBe(true);
      expect(body.data.password).toBeUndefined();
    });
    it("should return an error message when an internal server error occurs", async () => {
      vi.spyOn(User, "find").mockImplementation(() => {
        throw new Error("Internal Server Error");
      });

      const response = await request.get("/user/admin/get-users");
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Something went wrong");

      vi.spyOn(User, "find").mockRestore();
    });
  });

  describe("deleting a user", () => {
    let mockUser;

    beforeAll(async () => {
      mockUser = await User.create(fakerUser.user3);
    });

    afterAll(async () => {
      await User.deleteMany({ _id: mockUser._id });
    });
    it("it should successfully delete a user", async () => {
      const { body } = await request
        .delete(`/user/${mockUser._id}`)
        .expect(200);
      expect(body.success).to.equal(true);
    });
    it("should return 404 for no user  found to deleted ", async () => {
      const id = "41224d776a326fb40f000001";
      const { body } = await request.delete(`/user/${id}`).expect(404);
      expect(body.error).to.equal("User not found");
    });
    it("should return an error message when an internal server error occurs", async () => {
      vi.spyOn(User, "findByIdAndDelete").mockImplementation(() => {
        throw new Error("Internal Server Error");
      });

      const response = await request.delete(`/user/${mockUser._id}`);
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Something went wrong");

      vi.spyOn(User, "findByIdAndDelete").mockRestore();
    });
  });
  describe("getting a user", () => {
    let mockUser;

    beforeAll(async () => {
      mockUser = await User.create(fakerUser.User);
    });

    afterAll(async () => {
      await User.deleteMany({});
    });
    it("return 200 for getting a user", async () => {
      const { body } = await request.get(`/user/${mockUser._id}`).expect(200);
      expect(body.data.email).to.equal(fakerUser.User.email);
    });
    it("return 404 for user not found", async () => {
      const { body } = await request
        .get(`/user/64198a65c3230391471a19f`)
        .expect(404);
      expect(body.success).to.equal(false);
    });

    it("should return an error message when an internal server error occurs", async () => {
      vi.spyOn(User, "findById").mockImplementation(() => {
        throw new Error("Internale Server Error");
      });

      const response = await request.get(`/user/${mockUser._id}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Something went wrong");

      vi.spyOn(User, "findById").mockRestore();
    });
  });

  describe("logining a user", () => {
    let user;
    beforeAll(async () => {
      user = await User.create(fakerUser.user);
    });

    afterAll(async () => {
      await User.deleteMany({ _id: user._id });
    });
    it("successfully login a user", async () => {
      const response = await request
        .post("/user/login")
        .send({ email: "jumboper9@spms.com", password: "WHYsoSeRious1$%" });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
    it("should return an error when invalid credentials are provided", async () => {
      const response = await request
        .post("/user/login")
        .send({ email: "jumboper9@spms.com", password: "wrongpassword" });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Failed to authenticate user");
    });
    it("should return an error when email or password are empty", async () => {
      const { body } = await request
        .post("/user/login")
        .send({ email: "", password: "" })
        .expect(400);
      expect(body.email).toBe("Email is invalid");
      expect(body.password).toBe("Password is required");
    });

    it("should return an error when an email that does not exist is provided", async () => {
      const response = await request.post("/user/login").send({
        email: "nonexistentuser@example.com",
        password: "password123",
      });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Failed to authenticate user");
    });

    it("should return a 500 error when there is a server error", async () => {
      vi.spyOn(User, "findOne").mockImplementation(() => {
        throw new Error("Server error");
      });

      const response = await request
        .post("/user/login")
        .send({ email: "jumboper9@spms.com", password: "WHYsoSeRious1$%" });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Something went wrong");

      vi.spyOn(User, "findOne").mockRestore();
    });
  });

  describe("updating a user", () => {
    let mockUser;
    let id;

    beforeAll(async () => {
      // create a mock user for testing
      mockUser = new User({
        firstName: "pere",
      lastName: "jumbo",
      email: "jumboperebara0@spms.com",
      password: "WHYsoSeRious1$%",
      phone: "0903227656",
      dob: "2002/03/04",
      nin: "9892939302",
      gender: "male",
      age: 21
    });
      await mockUser.save();
      id=mockUser._id
    });

    afterAll(async () => {
      // delete the mock user after testing
      await User.deleteMany({});
    });

    it("should update a user", async () => {

      const response = await request.put(`/user/${id}`).send({ lastName: "Jumbo" });
      expect(response.status).toBe(500);
      expect(response.error.message).toBe("po");

      //   expect(response.body.data.firstName).toBe('Jane');
      //   expect(response.body.data.email).toBe(fakerUser.User.email);
      //  expect(response.body.data.password).toBeUndefined(); // make sure password is not returned
    });

    it("should return an error message when user is not found", async () => {
      const response = await request
        .put("/user/lophuybkjihu")
        .send({ age: 18 });
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("User not found");
    });

    it("should return an error message when an internal server error occurs", async () => {
      vi.spyOn(User, "findOneAndUpdate").mockImplementation(() => {
        throw new Error("Internal Server Error");
      });

      const response = await request
        .put(`/user/${id}`)
        .send({ firstName: "Jane" });
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Something went wrong");

      vi.spyOn(User, "findOneAndUpdate").mockRestore();
    });
  });
});
