import mongoose from "mongoose";

const experienceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  iconBg: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  points: [
    {
      type: String,
      required: true,
    },
  ],
});

export const ExperienceModel = mongoose.model("Experience", experienceSchema);
