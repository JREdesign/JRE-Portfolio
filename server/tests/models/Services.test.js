import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Service from '../../src/models/Services'; // Asegúrate de que la ruta sea correcta

describe('Service Model Test', () => {
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

  it('create & save service successfully', async () => {
    const validService = new Service({
      title: 'Desarrollo Web',
      icon: 'web_icon.png'
    });
    const savedService = await validService.save();

    // Verifica que los campos se guarden correctamente
    expect(savedService._id).toBeDefined();
    expect(savedService.title).toBe(validService.title);
    expect(savedService.icon).toBe(validService.icon);
  });

  it('create service without required field should fail', async () => {
    const serviceWithoutRequiredField = new Service({ title: 'Desarrollo Web' }); // Falta el campo "icon"
    let err;
    try {
      await serviceWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    // Verifica que Mongoose rechace el documento debido a campos requeridos faltantes
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.icon).toBeDefined();
  });

  // Agrega más tests según sea necesario
});
