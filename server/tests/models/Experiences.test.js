import mongoose from 'mongoose';
import { ExperienceModel } from '../../src/models/Experiences';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('Experience Model Test', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('create & save experience successfully', async () => {
    const validExperience = new ExperienceModel({
      title: 'Senior Developer',
      company_name: 'Tech Corp',
      icon: 'icon.png',
      iconBg: '#FFFFFF',
      date: 'January 2020 - Present',
      points: ['Developed cool stuff', 'Led a team of developers']
    });
    const savedExperience = await validExperience.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedExperience._id).toBeDefined();
    expect(savedExperience.title).toBe(validExperience.title);
    // ... add other assertions as needed
  });

  it('insert experience successfully, but the field not defined in schema should be undefined', async () => {
    const experienceWithInvalidField = new ExperienceModel({
      title: 'Senior Developer',
      company_name: 'Tech Corp',
      icon: 'icon.png',
      iconBg: '#FFFFFF',
      date: 'January 2020 - Present',
      points: ['Developed cool stuff', 'Led a team of developers'],
      nickname: 'DevMaster'  // nickname is not defined in the ExperienceModel schema
    });
    const savedExperienceWithInvalidField = await experienceWithInvalidField.save();
    expect(savedExperienceWithInvalidField._id).toBeDefined();
    expect(savedExperienceWithInvalidField.nickname).toBeUndefined();
  });

  it('create experience without required field should failed', async () => {
    const experienceWithoutRequiredField = new ExperienceModel({ title: 'Developer' });
    let err;
    try {
      const savedExperienceWithoutRequiredField = await experienceWithoutRequiredField.save();
      error = savedExperienceWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.company_name).toBeDefined();
  });

});
