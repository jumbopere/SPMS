import {
  describe,
  it,
  expect,
  afterAll,
  vi,
  beforeAll
} from "vitest";
import supertest from "supertest";


import app from "../../src/app.js";
import { testPerformanceData } from "../authHelper.js";
import PerformanceData from "../../src/models/performance.js";

const request = supertest(app);

describe("Performance route test", () => {
  describe("creating a new performance", () => {
    afterAll(async () => {
        await PerformanceData.deleteMany({});
    });
   
    it("should create a new performance data object and return it in the response", async () => {
      const response = await request
       .post('/performance')
        .send(testPerformanceData[0])
        .expect(201);

      expect(response.body.success).toBe(true);
    expect(response.body.data.position).toMatchObject(testPerformanceData[0].position);



    });

    it("should return a 500 error if there is an error while saving the performance data object", async () => {
      const mockSave = vi.fn(() => {
        throw new Error("Mock error");
      });
      vi
        .spyOn(PerformanceData.prototype, "save")
        .mockImplementationOnce(mockSave);

      // Make a request to create a new performance data object
      const response = await request
        .post("/performance")
        .send(testPerformanceData[0])
        .expect(500);

      // Verify that the response has a JSON body with an error message
      expect(response.body).toEqual({ message: "Something went wrong" });

      // Verify that the save method was called once
      expect(mockSave).toHaveBeenCalledTimes(1);
    });
  });
  describe("getting a performance", () => {
    let mockPerformance;

    beforeAll(async () => {
      mockPerformance = await PerformanceData.create(testPerformanceData[0]);
    });

    afterAll(async () => {
      await PerformanceData.deleteMany({});
    });
    it("return 200 for getting a performance", async () => {
      const { body } = await request.get(`/performance/${mockPerformance._id}`).expect(200);

      expect(body.count).toBe(mockPerformance.length);
    });
    it("return 404 for performance not found", async () => {
      const { body } = await request
        .get('/performance/641eee85283ba9a14fcf1bcf')
        .expect(404);
      expect(body.success).to.equal(false);
    });

    it("should return an error message when an internal server error occurs", async () => {
      vi.spyOn(PerformanceData, "findById").mockImplementation(() => {
        throw new Error("Internale Server Error");
      });

      const response = await request.get(`/performance/${mockPerformance._id}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Something went wrong");

      vi.spyOn(PerformanceData, "findById").mockRestore();
    });
  });
  describe('delete a performance', () => {
    let performance;
  
    beforeAll(async () => {
  
    performance = await PerformanceData.create(testPerformanceData[0])
    });
  
    afterAll(async () => {
      await PerformanceData.deleteMany({});
    });
  
    it('should delete a performance', async () => {
      const response = await request.delete(`/performance/${performance._id}`);
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Performance deleted successfully');
    });
  
    it('should return 401 if performance is not found', async () => {
      const response = await request.delete('/performance/641b4e7829c2005eb64b83cc');
  
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Performance not found');
    });
  
    it('should return 500 if there is a server error', async () => {
        vi.spyOn(PerformanceData, 'findByIdAndDelete').mockImplementation(() => {
            throw new Error('Internal Server Error');
          });
    
          const response = await request.delete(`/performance/${performance._id}`);
          expect(response.status).toBe(500);
          expect(response.body.message).toBe( "Something went wrong");
    
          vi.spyOn(PerformanceData, 'findByIdAndDelete').mockRestore();

    });
    
})
describe('updating a performance', () => {
  let performance;
  let id;

  beforeAll(async () => {
   
    performance = new PerformanceData(testPerformanceData[0])

    await performance.save();
    id = performance._id;
  });

  afterAll(async () => {
    await PerformanceData.deleteMany({});
  });

  it('should update a performance successfully', async () => {
    const res = await request
      .put(`/performance/${id}`)
      .send({
        temperature: 37,
        rpm: 5000,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Performance was updated successfully');
    expect(res.body.data.temperature).toBe(37);
    expect(res.body.data.rpm).toBe(5000);
  });

  it('should return 404 when trying to update a non-existing performance', async () => {
    const nonExistingId = "41224d776a326fb40f000001";

    const res = await request
      .put(`/performance/${nonExistingId}`)
      .send({
        temperature: 37,
        rpm: 5000,
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("Performance not found");
  });

  it('should return 500 when encountering server error', async () => {
    

    const res = await request
      .put(`/performance/${id}`)
      .send({
        rpm: 'invalid',
      });

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual('Something went wrong');
  });
});
});
