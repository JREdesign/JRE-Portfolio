import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { TechModel } from '../../src/models/Tech'; // Asegúrate de que la ruta sea correcta

describe('Tech Model Test', () => {
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

  it('create & save tech successfully', async () => {
    const validTech = new TechModel({
      name: 'React',
      icon: 'react_icon.png'
    });
    const savedTech = await validTech.save();

    // Verifica que los campos se guarden correctamente
    expect(savedTech._id).toBeDefined();
    expect(savedTech.name).toBe(validTech.name);
    expect(savedTech.icon).toBe(validTech.icon);
  });

  it('create tech without required field should fail', async () => {
    const techWithoutRequiredField = new TechModel({ name: 'React' }); // Falta el campo "icon"
    let err;
    try {
      await techWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    // Verifica que Mongoose rechace el documento debido a campos requeridos faltantes
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.icon).toBeDefined();
  });

  // Agrega más tests según sea necesario
});
