import mongoose from 'mongoose';
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,

} from 'vitest';
import {fakerUser} from '../authHelper.js';

import User from '../../src/models/user.js';

const testDatabase = 'mongodb://localhost:27017/test_database';


describe('User Model test', () => {
  beforeAll(async () => {
    mongoose.connect(testDatabase, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  afterEach(async () => {
    await User.deleteMany({})
  })
  afterAll(async () => {
    await mongoose.connection.close();
  });
  it('has a module', () => {
    expect(User).toBeDefined();
  });
  it('should save a user successfully', async () => {
    const user = new User(fakerUser.User);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstName).toBe(user.firstName);
    expect(savedUser.lastName).toBe(user.lastName);
    expect(savedUser.email).toBe(user.email);
    expect(savedUser.dob).toBe(user.dob);
    expect(savedUser.gender).toBe(user.gender);
    expect(savedUser.password).toBeDefined();
    expect(savedUser.nin).toBe(user.nin);
    expect(savedUser.phone).toBe(user.phone);
    expect(savedUser.age).toBe(user.age);
    expect(savedUser.createdAt).toBeDefined();
    expect(savedUser.updatedAt).toBeDefined();
  });
  it('should fail to save a user with a email', async () => {
    const user = new User(fakerUser.User);
    await user.save();

    const duplicateUser = new User(fakerUser.User);

    let error;
    try {
      await duplicateUser.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe('MongoServerError');
    expect(error.code).toBe(11000);
  });
  it('should fail to save a user without a required field', async () => {
    const user = new User(fakerUser.wrongUser)

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe('ValidationError');
  });


});
