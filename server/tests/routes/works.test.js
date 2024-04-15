import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { worksRouter } from '../../src/routes/works'; // Ajusta la ruta de importación

const app = express();
app.use(bodyParser.json());
app.use('/works', worksRouter);

describe('Works API', () => {
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

  it('GET /works - success', async () => {
    const response = await request(app).get('/works');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  }, 10000); // Aumentar el timeout si es necesario

  it('POST /works - success', async () => {
    const newWork = {
      name: "Project A",
      description: "A test project",
      tags: [{ name: 'JavaScript', color: '#F0DB4F' }],
      image: "project_a.png",
      source_code_link: "https://github.com/project_a"
    };

    const response = await request(app)
      .post('/works')
      .send(newWork);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(newWork.name);
  }, 10000); // Aumentar el timeout si es necesario

  // Agrega más pruebas para GET por ID, PATCH y DELETE aquí
});
