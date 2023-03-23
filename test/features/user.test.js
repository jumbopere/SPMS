import { describe, it, expect, afterAll, beforeAll, vi,beforeEach, afterEach} from "vitest";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../../src/app.js";
import {fakerUser} from "../authHelper.js";
import User from "../../src/models/user.js";

const request = supertest(app);

const testDatabase = 'mongodb://localhost:27017/test_database';



describe("user controllers test", () => {
 
  // describe('registering a new user', () => {
  //   beforeEach(async () => {
  
  //     await User.deleteMany({});
  //   });
  //     it('returns 201 for successfully register a user', async()=> {
  //     const response  =  await request.post('/user/register').send(fakerUser.user1)
  //     expect(response.status).toBe(201);
  // expect(response.body.token).toBeDefined();
  //      })
  //     it('returns (409 error) for duplicate email', () => {
  //      const {body} = request
  //         .post('/user/register')
  //         .send(fakerUser.user1)
  //           .expect(409)

  //     });
  //   it('returns 400 error if the first name field is empty', async () => {
  //     const { body } = await request
  //       .post('/user/register')
  //       .send(fakerUser.wrongUser)
  //       .expect(400);
  //     expect(body.firstName).to.equal('FirstName is required');
  //   });
  //   it('returns 400 error if the last name field is empty', async () => {
  //     const { body } = await request
  //       .post('/user/register')
  //       .send(fakerUser.wrongUser1)
  //       .expect(400);
  //     expect(body.lastName).to.equal('LastName is required');
  //   });
  //   it('returns 400 error if the email field is invalid', async () => {
  //     const { body } = await request
  //       .post('/user/register')
  //       .send(fakerUser.wrongUser2)
  //       .expect(400);
  //     expect(body.email).to.equal('Email is invalid');
  //   });
  //   it('returns 400 error if the email field is not lowercase', async () => {
  //     const { body } = await request
  //       .post('/user/register')
  //       .send(fakerUser.wrongUser6)
  //       .expect(400);
  //     expect(body.email).to.equal("Email must be in lowercase");
  //   });
  //   it('return 400 error if the password field is empty or invalid', async()=> {
  //       const { body} = await request.post('/user/register').send(fakerUser.wrongUser3);
  //       expect(body.password).to.equal("Password must be at least 8 character  containing at least 1 lowercase, number, uppercase, symbols")
  //   })
  //   it('return 400 error if the phone number field is empty or invalid', async()=> {
  //       const { body} = await request.post('/user/register').send(fakerUser.wrongUser4);
  //       expect(body.phoneNumber).to.equal("Phone Number is invalid")
  //   })
  //   it('return 400 error if the city, address, gender and state field are empty', async()=> {
  //       const { body} = await request.post('/user/register').send(fakerUser.wrongUser5);
  //       expect(body.city).to.equal("City is required")
  //       expect(body.address).to.equal("Address is required")
  //       expect(body.state).to.equal('State is required')
  //       expect(body.gender).to.equal('Gender is required')
  //   })

  //  });
describe('getting all user', ()=> {
  it("should get all users", async () => {
    const { body } = await request.get("/user/admin/get-users").expect(200);

    expect(body.success).toBe(true);
    expect(body.data.password).toBeUndefined();
  });
   it('should return an error message when an internal server error occurs', async () => {
    vi.spyOn(User, 'find').mockImplementation(() => {
      throw new Error('Internal Server Error');
    });

    const response = await request.get('/user/admin/get-users');
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Something went wrong');

    vi.spyOn(User, 'find').mockRestore();
  });
})
  

  describe("deleting a user", () => {
    let mockUser;

    beforeAll(async () => {

      mockUser = await User.create(fakerUser.user3);
    });

    afterAll(async () => {

      await User.deleteMany({"_id": mockUser._id});
    });
    it("it should successfully delete a user", async () => {
      const { body } = await request.delete(`/user/${mockUser._id}`).expect(200);
      expect(body.success).to.equal(true);
    });
    it("should return 404 for no user  found to deleted ", async () => {
      const id = "41224d776a326fb40f000001";
      const { body } = await request.delete(`/user/${id}`).expect(404);
      expect(body.error).to.equal("user not found");
    });
    it('should return an error message when an internal server error occurs', async () => {
      vi.spyOn(User, 'findByIdAndDelete').mockImplementation(() => {
        throw new Error('Internal Server Error');
      });

      const response = await request.delete(`/user/${mockUser._id}`);
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Something went wrong');

      vi.spyOn(User, 'findByIdAndDelete').mockRestore();
    });
  });
  describe("getting a user", () => {
    let mockUser;

    beforeAll(async () => {

      mockUser = await User.create(fakerUser.User);
    });

    afterAll(async () => {

      await User.deleteMany({"id":mockUser._id});
    });
    it("return 200 for getting a user", async () => {

      const { body } = await request.get(`/user/${mockUser._id}`).expect(200);
      expect(body.data.email).to.equal(fakerUser.User.email);
    });
    it("return 404 for user not found", async () => {
      ;
      const { body } = await request.get(`/user/64198a65c3230391471a19f`).expect(404);
      expect(body.success).to.equal(false);
    });

    it('should return an error message when an internal server error occurs', async () => {
      vi.spyOn(User, 'findById',).mockImplementation(() => {
        throw new Error('Internale Server Error');
      });

      const response = await request.get(`/user/${mockUser._id}`);
     
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Something went wrong');

      vi.spyOn(User, 'findById').mockRestore();
    });
  });

  describe("logining a user", () => {
let user;
    beforeAll(async () => {
  user= await User.create(fakerUser.user);
    });

    afterAll(async () => {
      await User.deleteMany({"_id": user._id});
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
      const {body} = await request
        .post("/user/login")
        .send({ email: "", password: "" }).expect(400);
      expect(body.email).toBe('Email is invalid');
      expect(body.password).toBe('Password is required');
    });

    it("should return an error when an email that does not exist is provided", async () => {
      const response = await request
        .post("/user/login")
        .send({
          email: "nonexistentuser@example.com",
          password: "password123",
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Failed to authenticate user");
    });

    it('should return a 500 error when there is a server error', async () => {
      vi.spyOn(User, 'findOne').mockImplementation(() => {
        throw new Error('Server error');
      });

      const response = await request
        .post('/user/login')
        .send({ email: "jumboper9@spms.com", password: "WHYsoSeRious1$%" });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Something went wrong');

      vi.spyOn(User, 'findOne').mockRestore();
    });
  });

  describe('updating a user', () => {
    let mockUser;
  
    beforeAll(async () => {
      // create a mock user for testing
      mockUser = await User.create(fakerUser.user3);
      
    });
  
    afterAll(async () => {
      // delete the mock user after testing
      await User.deleteMany({"id": mockUser._id});
    });
  
    it('should update a user', async () => {
      const response = await request
        .put(`/user/${mockUser.id}`)
      .send(fakerUser.user)
        expect(response.status).toBe(200);
      expect(response.body).toBe('po');
     
    //   expect(response.body.data.firstName).toBe('Jane');
    //   expect(response.body.data.email).toBe(fakerUser.User.email);
    //  expect(response.body.data.password).toBeUndefined(); // make sure password is not returned
    });
  
    it('should return an error message when user is not found', async () => {

      const response = await request.put('/user/lophuybkjihu')
        .send({age: 18 });
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('user not found');
    });
  
    it('should return an error message when an internal server error occurs', async () => {
      vi.spyOn(User, 'findOneAndUpdate').mockImplementation(() => {
        throw new Error('Internal Server Error');
      });
  
      const response = await request
        .put(`/user/${mockUser._id}`)
        .send({ firstName: 'Jane' });
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Something went wrong');
  
      vi.spyOn(User, 'findOneAndUpdate').mockRestore();
    });
  });
  // describe('registering a user', () => {
  //   let user;
  //   beforeEach(async () => {
  //     // Create a test user
  //     user = new User({
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       email: 'johndoe@example.com',
  //       password: 'password123',
  //       dob: '1990-01-01',
  //       nin: '1234567890',
  //       phone: '08012345678',
  //       gender: 'male',
  //       age: 31,
  //     });
  //     await user.save();
  //   });
  
  //   afterEach(async () => {
  //     // Delete the test user
  //     await User.findByIdAndDelete(user._id);
  //   });
  //   it('should register a new user', async () => {
  //     const res = await request
  //       .post('/user/register')
  //       .send({
  //         firstName: 'Jane',
  //         lastName: 'Doe',
  //         email: 'janedoe@example.com',
  //         password: 'password456',
  //         dob: '1995-01-01',
  //         nin: '0987654321',
  //         phone: '08098765432',
  //         gender: 'female',
  //       });
  //     expect(res.status).toBe(201);
  //     expect(res.body).toHaveProperty('token');
     
  //   });



  //   it('should not register a new user with an email that already exists', async () => {
  //     const res = await request
  //       .post('/user/register')
  //       .send({
  //         firstName: 'John',
  //         lastName: 'Doe',
  //         email: 'johndoe@example.com',
  //         password: 'password123',
  //         dob: '1990-01-01',
  //         nin: '1234567890',
  //         phone: '08012345678',
  //         gender: 'male',
  //       });
  //     expect(res.status).toBe(409);
  //     expect(res.body.message).toBe('User already exists' );
  //   });
  // });

  
});



  