import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import servicesRouter from '../../src/routes/services'; // Ruta de importación actualizada

const app = express();
app.use(bodyParser.json());
app.use('/services', servicesRouter);

describe('Services API', () => {
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

  it('GET /services - success', async () => {
    const response = await request(app).get('/services');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  }, 10000); // Aumentar el timeout si es necesario

  it('POST /services - success', async () => {
    const newService = {
      title: "Desarrollo Web",
      icon: "icon_url"
    };

    const response = await request(app)
      .post('/services')
      .send(newService);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(newService.title);
  }, 10000); // Aumentar el timeout si es necesario

  // Agrega más pruebas para GET por ID, PATCH y DELETE aquí
});
