import mongoose from "mongoose";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";

import Sensor from "../../src/models/sensor.js";

const testDatabase = "mongodb://localhost:27017/test_database";
mongoose.connect(testDatabase);

describe("Sensor model", () => {
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
    // Clear the Sensor collection after each test
    await Sensor.deleteMany();
  });

  it("should save a sensor successfully", async () => {
    const sensor = new Sensor({
      name: "Temperature sensor",
      type: "Temperature",
      location: "Engine room",
      calibration: 1.0,
      ship: "641b528a7b4fa8edd508e3a2",
    });
    const savedSensor = await sensor.save();

    expect(savedSensor._id).toBeDefined();
    expect(savedSensor.name).toBe(sensor.name);
    expect(savedSensor.type).toBe(sensor.type);
    expect(savedSensor.location).toBe(sensor.location);
    expect(savedSensor.calibration).toBe(sensor.calibration);
    expect(savedSensor.ship).toEqual(sensor.ship);
    expect(savedSensor.createdAt).toBeDefined();
    expect(savedSensor.updatedAt).toBeDefined();
  });

  it("should fail to save a sensor without a required field", async () => {
    const sensor = new Sensor({
      name: "Temperature sensor",
      location: "Engine room",
      calibration: 1.0,
      ship: "641b528a7b4fa8edd508e3a2",
    });

    let error;
    try {
      await sensor.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe("ValidationError");
  });

  it("should fail to save a sensor with an invalid ship ID", async () => {
    const sensor = new Sensor({
      name: "Temperature sensor",
      type: "Temperature",
      location: "Engine room",
      calibration: 1.0,
      ship: "641b528a7b4fa8edd508e3a2op",
    });

    let error;
    try {
      await sensor.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe("ValidationError");
  });
});
