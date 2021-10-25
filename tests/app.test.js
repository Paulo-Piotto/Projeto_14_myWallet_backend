import app from '../src/app.js';
import supertest from 'supertest';

describe("POST /sign-in",  () => {
    it("returns 200 for valid params", async () => {
        const body = {
            email: 'paulo@gmail.com',
            password: '123456'
        }; // corpo válido
        const result = await supertest(app).post("/sign-in").send(body);
        const status = result.status;
        expect(status).toEqual(200);
    });

    it("returns 400 for invalid params", async () => {
        const body = {}; // corpo inválido
        const result = await supertest(app).post("/sign-in").send(body);
        const status = result.status;
        expect(status).toEqual(401);
    });
});