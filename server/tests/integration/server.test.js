import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
// Corregir las rutas de importación
import { userRouter } from '../../src/routes/user.js';
import servicesRouter from '../../src/routes/services.js';
import { experiencesRouter } from '../../src/routes/experiences.js';
import { techRouter } from '../../src/routes/tech.js';
import { worksRouter } from '../../src/routes/works.js';
import { feedbacksRouter } from '../../src/routes/feedbacks.js';

const app = express();
app.use(bodyParser.json());
app.use('/auth', userRouter);
app.use('/services', servicesRouter);
app.use('/experiences', experiencesRouter);
app.use('/tech', techRouter);
app.use('/works', worksRouter);
app.use('/feedbacks', feedbacksRouter);

describe('Server Root Path', () => {
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

  // Ejemplo de prueba para una ruta específica
  it('It should respond with a 404 status code for the root path', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
  });
});
