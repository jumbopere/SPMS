import { describe, it, expect, afterAll, beforeAll, vi, beforeEach, afterEach } from "vitest";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../../src/app.js";
import { fleetOfShips } from "../authHelper.js";
import Ship from "../../src/models/ship.js";


const request = supertest(app);
const testDatabase = 'mongodb://localhost:27017/test_database';


describe("Ship routes", () => {
   
    describe('creating a new ship', () => {
        afterAll(async () => {
            await Ship.deleteMany({ "userId": "641b4e7829c2005eb64b83cd"});
        });

        it('should create a new ship', async () => {
           
            const response = await request
                .post('/ship')
                .send(fleetOfShips.newShip)
            expect(201);
            expect(response.body.message).toEqual('Ship was created successfully');
            expect(response.body.data.name).toEqual('Mighty Ship');

        });

        it('should return 500 status if there is a server error', async () => {
            // mock the Ship model to throw an error when saving
            vi.spyOn(Ship.prototype, 'save').mockRejectedValueOnce(new Error('Something went wrong'));

            const newShip = {
                name: 'Example Ship',
                imo: '1234567',
                type: 'Cargo',
                yearBuilt: 2010,
                dwt: 50000,
                lengthOverall: 250,
                beam: 32,
                speed: 20,
                userId: '641b4e7829c2005eb64b83cc'
            };

            const res = await request
                .post('/ship')
                .send(newShip)
                .expect(500);

            expect(res.body).toEqual({
                success: false,
                error: 'Server Error'
            });
        });
    });
    describe('get all users ships', () => {
        beforeAll(async()=> {
            const mockShips = [fleetOfShips.ship1, fleetOfShips.ship2, fleetOfShips.ship3, fleetOfShips.ship4]
            await Ship.insertMany(mockShips)
        })
        afterAll(async () => {
            await Ship.deleteMany({ "userId": "641b4e7829c2005eb64b83cc"});
        });

        it('should return a list of ships belonging to the specified user', async () => {
            const userId = '641b4e7829c2005eb64b83cc' ;
        

            const response = await request.get(`/ship/${userId}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('ships fetched successfully');
       
        });

        it('should return a 500 error if an error occurs while fetching ships', async () => {
            const userId = '123';
            vi.spyOn(Ship, 'find').mockRejectedValue(new Error('Database Error'));

            const response = await request.get(`/ship/${userId}`);

            expect(response.status).toBe(500);
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Server Error');
        });
    });





})