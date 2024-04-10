// models/Works.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const tagSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true }
});

const workSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [tagSchema], // Usamos el esquema de tag definido arriba
  image: {
    type: String,
    required: true,
  },
  source_code_link: {
    type: String,
    required: false, 
  },
});

const WorkModel = mongoose.model('Work', workSchema);

export default WorkModel;
