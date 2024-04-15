import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { feedbacksRouter } from '../../src/routes/feedbacks'; // Asegúrate de que la ruta sea correcta

const app = express();
app.use(bodyParser.json());
app.use('/feedbacks', feedbacksRouter);

describe('Feedbacks API', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('GET /feedbacks - success', async () => {
    const response = await request(app).get('/feedbacks');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  }, 10000); // Aumentar el timeout si es necesario

  it('POST /feedbacks - success', async () => {
    const newFeedback = {
      testimonial: "Este es un gran servicio.",
      name: "Juan Perez",
      designation: "CEO",
      company: "Tech Innovations",
      image: "profile_pic.png"
    };

    const response = await request(app)
      .post('/feedbacks')
      .send(newFeedback);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.testimonial).toBe(newFeedback.testimonial);
  }, 10000); // Aumentar el timeout si es necesario

  // Aquí puedes agregar más pruebas para GET por ID, PATCH y DELETE
});
