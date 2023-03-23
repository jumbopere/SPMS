import app from "../../src/app.js";
import supertest from "supertest";
import { describe, expect, it, } from "vitest";

//const request = supertest(app);
 const request = supertest(app)

describe("Get home api", ()=> {
    it("should return a 200 success status and a welcome message", async () => {
        const { body } = await request.get("/").expect(200);
    
        expect(body.message).to.equal('Welcome to the ship performance monitoring system');
      });
      it("should return a 404 for non-existing routes", async () => {
        const { body } = await request.get("/notfound").expect(404);
    
        expect(body.message).to.equal("you are trying to access an unknown route");
      });
})