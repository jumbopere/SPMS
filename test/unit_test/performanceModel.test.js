import mongoose from "mongoose";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";

import PerformanceData from "../../src/models/performance";

const testDatabase = "mongodb://localhost:27017/test_database";
mongoose.connect(testDatabase);

describe("Performance model", () => {
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

    await PerformanceData.deleteMany();
  });

  it("should save a Performance successfully", async () => {
    const performance = new PerformanceData({
      speed: 34,
      position: "Engine room",
      rpm: 3,
      temperature: 37,
  fuelConsumption: 230,
      ship: "641b528a7b4fa8edd508e3a2",
    });
    const savedPerformance = await performance.save();

    expect(savedPerformance._id).toBeDefined();
    expect(savedPerformance.speed).toBe(performance.speed);
    expect(savedPerformance.rpm).toBe(performance.rpm);
    expect(savedPerformance.position).toBe(performance.position);
    expect(savedPerformance.temperature).toBe(performance.temperature);
    expect(savedPerformance.fuelConsumption).toBe(performance.fuelConsumption);
    expect(savedPerformance.ship).toEqual(performance.ship);
    expect(savedPerformance.createdAt).toBeDefined();
    expect(savedPerformance.updatedAt).toBeDefined();
  });

  it("should fail to save a Performance without a required field", async () => {
    const performance = new PerformanceData({
        speed: 34,
        position: "Engine room",
        temperature: 37,
    fuelConsumption: 230,
        ship: "641b528a7b4fa8edd508e3a2",
      });

    let error;
    try {
      await performance.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe("ValidationError");
  });

  it("should fail to save a Performance with an invalid ship ID", async () => {
    const performance = new PerformanceData({
        speed: 34,
        position: "Engine room",
        rpm: 3,
        temperature: 37,
    fuelConsumption: 230,
        ship: "641b528a7b4fa8edd508e3a21",
      });

    let error;
    try {
      await performance.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe("ValidationError");
  });
});