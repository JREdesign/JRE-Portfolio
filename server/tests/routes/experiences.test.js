import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { experiencesRouter } from '../../src/routes/experiences';


const app = express();
app.use(bodyParser.json());
app.use('/experiences', experiencesRouter);

describe('Experiences API', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  // Aumenta el timeout si es necesario
  it('GET /experiences - success', async () => {
    const response = await request(app).get('/experiences');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  }, 10000); // Timeout ajustado a 10000 ms
});
