import mongoose, {ObjectId} from 'mongoose';
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  
} from 'vitest';

import Ship from '../../src/models/ship';

const testDatabase = 'mongodb://localhost:27017/test_database';
mongoose.connect(testDatabase);

describe('Ship model', () => {
    beforeAll(async () => {
      // Connect to MongoDB
      await mongoose.connect(testDatabase, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  
    afterAll(async () => {
      // Disconnect from MongoDB
      await mongoose.disconnect();
    });
  
    afterEach(async () => {
      await Ship.deleteMany();
    });
  
    it('should save a ship successfully', async () => {
      const ship = new Ship({
        name: 'Titanic',
        imo: 1234567,
        type: 'Passenger ship',
        yearBuilt: 1912,
        dwt: 46000,
        lengthOverall: 269,
        beam: 28,
        speed: 23,
        userId: '641b4e7829c2005eb64b83cc',
      });
      const savedShip = await ship.save();
  
      expect(savedShip._id).toBeDefined();
      expect(savedShip.name).toBe(ship.name);
      expect(savedShip.imo).toBe(ship.imo);
      expect(savedShip.type).toBe(ship.type);
      expect(savedShip.yearBuilt).toBe(ship.yearBuilt);
      expect(savedShip.dwt).toBe(ship.dwt);
      expect(savedShip.lengthOverall).toBe(ship.lengthOverall);
      expect(savedShip.beam).toBe(ship.beam);
      expect(savedShip.speed).toBe(ship.speed);
      expect(savedShip.userId).toBe(ship.userId);
      expect(savedShip.createdAt).toBeDefined();
      expect(savedShip.updatedAt).toBeDefined();
    });
  
    it('should fail to save a ship with a duplicate name or IMO', async () => {
      const ship = new Ship({
        name: 'Titanic',
        imo: 1234567,
        type: 'Passenger ship',
        yearBuilt: 1912,
        dwt: 46000,
        lengthOverall: 269,
        beam: 28,
        speed: 23,
        userId: '641b4e7829c2005eb64b83cc',
      });
      await ship.save();
  
      const duplicateShip = new Ship({
        name: 'Titanic',
        imo: 1234567,
        type: 'Cargo ship',
        yearBuilt: 2000,
        dwt: 80000,
        lengthOverall: 300,
        beam: 40,
        speed: 18,
        userId:'641b4e7829c2005eb64b83cc',
      });
  
      let error;
      try {
        await duplicateShip.save();
      } catch (err) {
        error = err;
      }
  
      expect(error).toBeDefined();
      expect(error.name).toBe('MongoServerError');
      expect(error.code).toBe(11000);
    });
  
    it('should fail to save a ship without a required field', async () => {
      const ship = new Ship({
        imo: 1234567,
        type: 'Passenger ship',
        yearBuilt: 1912,
        dwt: 46000,
        lengthOverall: 269,
        beam: 28,
        speed: 23,
        userId: '641b4e7829c2005eb64b83cc',
      });
  
      let error;
      try {
        await ship.save();
      } catch (err) {
        error = err;
      }
  
      expect(error).toBeDefined();
      expect(error.name).toBe('ValidationError');
    });
  });