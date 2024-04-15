import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Feedback from '../../src/models/Feedbacks'; // Asegúrate de que la ruta sea correcta

describe('Feedback Model Test', () => {
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

  it('create & save feedback successfully', async () => {
    const validFeedback = new Feedback({
      testimonial: 'Este servicio fue increíble.',
      name: 'Juan Perez',
      designation: 'CEO',
      company: 'Tech Innovations',
      image: 'juan_perez.png'
    });
    const savedFeedback = await validFeedback.save();

    // Verifica que los campos se guarden correctamente
    expect(savedFeedback._id).toBeDefined();
    expect(savedFeedback.testimonial).toBe(validFeedback.testimonial);
    expect(savedFeedback.name).toBe(validFeedback.name);
    expect(savedFeedback.designation).toBe(validFeedback.designation);
    expect(savedFeedback.company).toBe(validFeedback.company);
    expect(savedFeedback.image).toBe(validFeedback.image);
  });

  it('create feedback without required field should fail', async () => {
    const feedbackWithoutRequiredField = new Feedback({ name: 'Juan Perez' });
    let err;
    try {
      await feedbackWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    // Verifica que Mongoose rechace el documento debido a campos requeridos faltantes
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.testimonial).toBeDefined();
    // Puedes agregar más expectativas para otros campos requeridos aquí
  });

  // Agrega más tests según sea necesario
});
