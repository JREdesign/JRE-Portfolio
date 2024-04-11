import mongoose from 'mongoose';

const { Schema } = mongoose;

const feedbackSchema = new Schema({
  testimonial: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true, 
  },
  company: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
