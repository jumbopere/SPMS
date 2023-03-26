import { describe, it, expect, afterAll, beforeAll, vi,beforeEach, afterEach} from "vitest";
import supertest from "supertest";

import app from "../../src/app.js";
import { sensorArray, testPerformanceData } from "../authHelper.js";
import Sensor from "../../src/models/sensor.js";

const request = supertest(app);

describe('Sensor routes test', ()=> {
    describe("creating a new sensor", () => {
        afterAll(async () => {
          await Sensor.deleteMany({ });
        });
    
        it("should create a new sensor", async () => {
          const response = await request.post("/sensor/").send(sensorArray[0]);
          expect(201);
          expect(response.body.message).toEqual("Sensor created successfully");
          expect(response.body.data.name).toEqual("Temperature Sensor");
        });
        it("returns (409 error) for duplicate name", async () => {
            const response = await request
              .post("/sensor/")
              .send(sensorArray[0])
              .expect(409);
            expect(response.body.message).toBe("Sensor already exists");
          });
        it("should return 500 status if there is a server error", async () => {
          // mock the sensor model to throw an error when saving
          vi.spyOn(Sensor.prototype, "save").mockRejectedValueOnce(
            new Error("Something went wrong")
          );
    
        
    
          const res = await request.post("/sensor/").send(sensorArray[1]).expect(500);
    
          expect(res.body.message).toBe("Something went wrong");
        });
      });
      describe("get all ship sensors", () => {
        beforeAll(async () => {
          
          await Sensor.insertMany(sensorArray);
        });
        afterAll(async () => {
          await Sensor.deleteMany({});
        });
    
        it("should return a list of sensors belonging to the specified user", async () => {
          const shipId = "61574a156a5b5f76cb5e5af5";
    
          const response = await request.get(`/sensor/ship/${shipId}`);
    
          expect(response.status).toBe(200);
          expect(response.body.success).toBe(true);
        });
    
        it("should return a 500 error if an error occurs while fetching sensors", async () => {
          const userId = "123";
          vi.spyOn(Sensor, "find").mockRejectedValue(new Error("Database Error"));
    
          const response = await request.get(`/sensor/ship/${userId}`);
    
          expect(response.status).toBe(500);
          expect(response.body.message).toBe("Something went wrong");
        });
      });
      describe("getting a sensor", () => {
        let mocksensor;
    
        beforeAll(async () => {
          mocksensor = await Sensor.create(sensorArray[1]);
        });
    
        afterAll(async () => {
          await Sensor.deleteMany({});
        });
        it("return 200 for getting a sensor", async () => {
          const { body } = await request.get(`/sensor/${mocksensor._id}`).expect(200);
          expect(body.data.name).to.equal(sensorArray[1].name);
        });
        it("return 404 for sensor not found", async () => {
          const { body } = await request
            .get("/sensor/641eee85283ba9a14fcf1bcf")
            .expect(404);
          expect(body.message).to.equal("Sensor not found");
        });
    
        it("should return an error message when an internal server error occurs", async () => {
          vi.spyOn(Sensor, "findById").mockImplementation(() => {
            throw new Error("Internale Server Error");
          });
    
          const response = await request.get(`/sensor/${mocksensor._id}`);
    
          expect(response.status).toBe(500);
          expect(response.body.message).toBe("Something went wrong");
    
          vi.spyOn(Sensor, "findById").mockRestore();
        });
      });
      describe("deleting a sensor", () => {
        let sensor;
    
        beforeAll(async () => {
          sensor = await Sensor.create(sensorArray[2]);
        });
    
        afterAll(async () => {
          await Sensor.deleteMany({});
        });
    
        it("should delete a sensor", async () => {
          const response = await request.delete(`/sensor/${sensor._id}`);
    
          expect(response.status).toBe(200);
          expect(response.body.message).toBe("Sensor deleted successfully");
        });
    
        it("should return 401 if sensor is not found", async () => {
          const response = await request.delete("/sensor/641b4e7829c2005eb64b83cc");
    
          expect(response.status).toBe(404);
          expect(response.body.message).toBe("Sensor not found");
        });
    
        it("should return 500 if there is a server error", async () => {
          vi.spyOn(Sensor, "findByIdAndDelete").mockImplementation(() => {
            throw new Error("Internal Server Error");
          });
    
          const response = await request.delete(`/sensor/${sensor._id}`);
          expect(response.status).toBe(500);
          expect(response.body.message).toBe("Something went wrong");
    
          vi.spyOn(Sensor, "findByIdAndDelete").mockRestore();
        });
      });
      describe("updating a sensor", () => {
        let sensor;
        let id;
    
        beforeAll(async () => {
          // Create a sensor for testing
          sensor = await Sensor.create(sensorArray[0]);
    
        
          id = sensor._id;
        });
    
        afterAll(async () => {
          await Sensor.deleteMany({});
        });
    
        it("should update a sensor successfully", async () => {
          const res = await request.put(`/sensor/${id}`).send({
            name: "Updated sensor Name",
            yearBuilt: 2021,
          });
    
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe("Sensor was updated successfully");
          expect(res.body.data.name).toBe("Updated sensor Name");
        });
    
        it("should return 404 when trying to update a non-existing sensor", async () => {
          const nonExistingId = "41224d776a326fb40f000001";
    
          const res = await request.put(`/sensor/${nonExistingId}`).send({
            name: "Updated sensor Name",
          });
    
          expect(res.statusCode).toEqual(404);
          expect(res.body.message).toEqual("Sensor not found");
        });
    
        it("should return 500 when encountering server error", async () => {
          const res = await request.put(`/sensor/${id}`).send({
            calibration : "invalid",
          });
    
          expect(res.statusCode).toEqual(500);
          expect(res.body.message).toEqual("Something went wrong");
        });
      });
})