import mongoose from 'mongoose';

const techSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // Asegúrate de que los valores de los íconos sean rutas válidas o URLs.
});

export const TechModel = mongoose.model('Tech', techSchema);
