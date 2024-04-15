import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import WorkModel from '../../src/models/Works'; // Asegúrate de que la ruta sea correcta

describe('Work Model Test', () => {
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

  it('create & save work successfully with tags', async () => {
    const validWork = new WorkModel({
      name: 'Project A',
      description: 'A test project',
      tags: [
        { name: 'JavaScript', color: '#F0DB4F' },
        { name: 'React', color: '#61DBFB' }
      ],
      image: 'project_a.png',
      source_code_link: 'https://github.com/project_a'
    });
    const savedWork = await validWork.save();

    // Verifica que los campos se guarden correctamente
    expect(savedWork._id).toBeDefined();
    expect(savedWork.tags.length).toBe(2);
    expect(savedWork.tags[0].name).toBe('JavaScript');
    expect(savedWork.tags[1].color).toBe('#61DBFB');
  });

  it('create work without required field should fail', async () => {
    const workWithoutRequiredField = new WorkModel({ name: 'Incomplete Project' }); // Falta el campo "description" y otros campos requeridos
    let err;
    try {
      await workWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    // Verifica que Mongoose rechace el documento debido a campos requeridos faltantes
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.description).toBeDefined();
  });

  it('create work with tags missing required field should fail', async () => {
    const workWithIncompleteTags = new WorkModel({
      name: 'Project B',
      description: 'A project with incomplete tags',
      tags: [{ color: '#FFFFFF' }], // Falta el campo "name" en el tag
      image: 'project_b.png'
    });
    let err;
    try {
      await workWithIncompleteTags.save();
    } catch (error) {
      err = error;
    }
    // Verifica que Mongoose rechace el subdocumento tag debido a campos requeridos faltantes
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors['tags.0.name']).toBeDefined();
  });

  // Agrega más tests según sea necesario
});
