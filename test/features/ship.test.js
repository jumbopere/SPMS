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
import app from "../../src/app.js";
import { fleetOfShips } from "../authHelper.js";
import Ship from "../../src/models/ship.js";

const request = supertest(app);

describe("Ship routes test", () => {
  describe("creating a new ship", () => {
    afterAll(async () => {
      await Ship.deleteMany({ userId: "641b4e7829c2005eb64b83cd" });
    });

    it("should create a new ship", async () => {
      const response = await request.post("/ship").send(fleetOfShips.newShip);
      expect(201);
      expect(response.body.message).toEqual("Ship was created successfully");
      expect(response.body.data.name).toEqual("Mighty Ship");
    });

    it("should return 500 status if there is a server error", async () => {
      // mock the Ship model to throw an error when saving
      vi.spyOn(Ship.prototype, "save").mockRejectedValueOnce(
        new Error("Something went wrong")
      );

      const newShip = {
        name: "Example Ship",
        imo: "1234567",
        type: "Cargo",
        yearBuilt: 2010,
        dwt: 50000,
        lengthOverall: 250,
        beam: 32,
        speed: 20,
        userId: "641b4e7829c2005eb64b83cc",
      };

      const res = await request.post("/ship").send(newShip).expect(500);

      expect(res.body.message).toBe("Something went wrong");
    });
  });
  describe("get all users ships", () => {
    beforeAll(async () => {
      const mockShips = [
        fleetOfShips.ship1,
        fleetOfShips.ship2,
        fleetOfShips.ship3,
        fleetOfShips.ship4,
      ];
      await Ship.insertMany(mockShips);
    });
    afterAll(async () => {
      await Ship.deleteMany({});
    });

    it("should return a list of ships belonging to the specified user", async () => {
      const userId = "641b4e7829c2005eb64b83cc";

      const response = await request.get(`/ship/user/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Ships fetched successfully");
    });

    it("should return a 500 error if an error occurs while fetching ships", async () => {
      const userId = "123";
      vi.spyOn(Ship, "find").mockRejectedValue(new Error("Database Error"));

      const response = await request.get(`/ship/user/${userId}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Something went wrong");
    });
  });
  describe("getting a ship", () => {
    let mockShip;

    beforeAll(async () => {
      mockShip = await Ship.create(fleetOfShips.newShip);
    });

    afterAll(async () => {
      await Ship.deleteMany({});
    });
    it("return 200 for getting a ship", async () => {
      const { body } = await request.get(`/ship/${mockShip._id}`).expect(200);
      expect(body.data.name).to.equal(fleetOfShips.newShip.name);
    });
    it("return 404 for ship not found", async () => {
      const { body } = await request
        .get("/ship/641eee85283ba9a14fcf1bcf")
        .expect(404);
      expect(body.success).to.equal(false);
    });

    it("should return an error message when an internal server error occurs", async () => {
      vi.spyOn(Ship, "findById").mockImplementation(() => {
        throw new Error("Internale Server Error");
      });

      const response = await request.get(`/ship/${mockShip._id}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Something went wrong");

      vi.spyOn(Ship, "findById").mockRestore();
    });
  });
  describe("deleting a ship", () => {
    let ship;

    beforeAll(async () => {
      ship = await Ship.create(fleetOfShips.newShip);
    });

    afterAll(async () => {
      await Ship.deleteMany({});
    });

    it("should delete a ship", async () => {
      const response = await request.delete(`/ship/${ship._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Ship deleted successfully");
    });

    it("should return 401 if ship is not found", async () => {
      const response = await request.delete("/ship/641b4e7829c2005eb64b83cc");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Ship not found");
    });

    it("should return 500 if there is a server error", async () => {
      vi.spyOn(Ship, "findByIdAndDelete").mockImplementation(() => {
        throw new Error("Internal Server Error");
      });

      const response = await request.delete(`/ship/${ship._id}`);
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Something went wrong");

      vi.spyOn(Ship, "findByIdAndDelete").mockRestore();
    });
  });
  describe("updating a ship", () => {
    let ship;
    let id;

    beforeAll(async () => {
      // Create a ship for testing
      ship = new Ship({
        name: "Test Ship",
        imo: 1234567,
        type: "Cargo",
        yearBuilt: 2022,
        dwt: 50000,
        lengthOverall: 200,
        beam: 30,
        speed: 20,
        userId: "607f1f77bcf86cd799439011",
      });

      await ship.save();
      id = ship._id;
    });

    afterAll(async () => {
      await Ship.deleteMany({});
    });

    it("should update a ship successfully", async () => {
      const res = await request.put(`/ship/${id}`).send({
        name: "Updated Ship Name",
        yearBuilt: 2021,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Ship was updated successfully");
      expect(res.body.updatedShip.name).toBe("Updated Ship Name");
      expect(res.body.updatedShip.yearBuilt).toBe(2021);
    });

    it("should return 404 when trying to update a non-existing ship", async () => {
      const nonExistingId = "41224d776a326fb40f000001";

      const res = await request.put(`/ship/${nonExistingId}`).send({
        name: "Updated Ship Name",
      });

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual("Ship not found");
    });

    it("should return 500 when encountering server error", async () => {
      const res = await request.put(`/ship/${id}`).send({
        yearBuilt: "invalid",
      });

      expect(res.statusCode).toEqual(500);
      expect(res.body.message).toEqual("Something went wrong");
    });
  });
});
