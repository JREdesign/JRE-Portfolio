import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { techRouter } from '../../src/routes/tech'; // Ajusta la ruta de importación

const app = express();
app.use(bodyParser.json());
app.use('/tech', techRouter);

describe('Tech API', () => {
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

  it('GET /tech - success', async () => {
    const response = await request(app).get('/tech');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  }, 10000); // Aumentar el timeout si es necesario

  it('POST /tech - success', async () => {
    const newTech = {
      name: "React",
      icon: "react_icon.png"
    };

    const response = await request(app)
      .post('/tech')
      .send(newTech);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(newTech.name);
  }, 10000); // Aumentar el timeout si es necesario

  // Agrega más pruebas para GET por ID, PATCH y DELETE aquí
});
