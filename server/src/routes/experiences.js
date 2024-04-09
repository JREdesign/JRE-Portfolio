import express from "express";
import mongoose from "mongoose";
import { ExperienceModel } from "../models/Experiencies.js";

const router = express.Router();

// Obtener todas las experiencias
router.get("/", async (req, res) => {
  try {
    const result = await ExperienceModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Crear una nueva experiencia
router.post("/", async (req, res) => {
  const experience = new ExperienceModel({
    title: req.body.title,
    company_name: req.body.company_name,
    icon: req.body.icon,
    iconBg: req.body.iconBg,
    date: req.body.date,
    points: req.body.points,
  });

  try {
    const result = await experience.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Obtener una experiencia por ID
router.get("/:experienceId", async (req, res) => {
  try {
    const result = await ExperienceModel.findById(req.params.experienceId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Actualizar una experiencia por ID
router.patch("/:experienceId", async (req, res) => {
  try {
    const { experienceId } = req.params;
    const updatedExperience = await ExperienceModel.findByIdAndUpdate(experienceId, req.body, { new: true });

    if (!updatedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json(updatedExperience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una experiencia por ID
router.delete("/:experienceId", async (req, res) => {
  try {
    await ExperienceModel.findByIdAndDelete(req.params.experienceId);
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (err) {
    console.error("Error deleting experience:", err);
    res.status(500).json({ error: err.message });
  }
});

export { router as experiencesRouter };

