import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserModel } from '../../src/models/Users'; // Asegúrate de que la ruta sea correcta

describe('User Model Test', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    await UserModel.ensureIndexes(); // Asegura la construcción de índices
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    // Limpia la colección después de cada prueba
    await UserModel.deleteMany({});
  });

  it('create & save user successfully', async () => {
    const validUser = new UserModel({
      username: 'testUserSuccess',
      password: 'testPassword',
      savedRecipes: []
    });
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(validUser.username);
    expect(savedUser.password).toBeDefined(); // Modificado para no comprobar el valor exacto debido a la encriptación
    expect(Array.isArray(savedUser.savedRecipes)).toBe(true);
    expect(savedUser.savedRecipes.length).toBe(0);
  });

  it('create user without required field should fail', async () => {
    const userWithoutRequiredField = new UserModel({ username: 'testUserFail' }); // Falta el campo "password"
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
  });

  it('enforces the username to be unique', async () => {
    const username = 'uniqueUserTest';
    const user1 = new UserModel({ username, password: 'testPassword' });

    await user1.save(); // Guarda el primer usuario

    const user2 = new UserModel({ username, password: 'anotherTestPassword' });

    try {
      await user2.save();
      // Si llegamos aquí, la prueba debería fallar porque se esperaba un error de MongoDB por violación de unicidad
      fail('Se esperaba un error de MongoDB por violación de unicidad');
    } catch (err) {
      expect(err.name).toBe('MongoServerError');
      expect(err.code).toBe(11000); // Código de error de MongoDB para violación de la unicidad
    }
  });
});
