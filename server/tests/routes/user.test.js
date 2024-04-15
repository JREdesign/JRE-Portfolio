import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { userRouter } from '../../src/routes/user'; // Asegúrate de que la ruta sea correcta
import { UserModel } from '../../src/models/Users'; // Asegúrate de que la ruta sea correcta

const app = express();
app.use(bodyParser.json());
app.use(userRouter);

describe('User API', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    // Crear un usuario de prueba en la base de datos
    const password = await bcrypt.hash('testPassword', 10);
    const user = new UserModel({
      username: 'testUser',
      password,
    });
    await user.save();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('POST /register - User registration fails with existing username', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'testUser',
        password: 'testPassword',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Username already exists');
  });

  it('POST /register - User registration succeeds', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'newUser',
        password: 'newPassword',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('POST /login - User login fails with incorrect credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testUser',
        password: 'wrongPassword',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Username or password is incorrect');
  });

  it('POST /login - User login succeeds with correct credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testUser',
        password: 'testPassword',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('userID');
  });
});
