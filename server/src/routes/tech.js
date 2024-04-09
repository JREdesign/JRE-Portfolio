// routes/tech.js
import express from "express";
import { TechModel } from "../models/Tech.js";

const router = express.Router();

// Obtener todas las tecnologías
router.get("/", async (req, res) => {
  try {
    const result = await TechModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Crear una nueva tecnología
router.post("/", async (req, res) => {
  const tech = new TechModel({
    name: req.body.name,
    icon: req.body.icon,
  });

  try {
    const result = await tech.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Obtener una tecnología por ID
router.get("/:techId", async (req, res) => {
  try {
    const result = await TechModel.findById(req.params.techId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Actualizar una tecnología por ID
router.patch("/:techId", async (req, res) => {
  try {
    const { techId } = req.params;
    const updatedTech = await TechModel.findByIdAndUpdate(techId, req.body, { new: true });

    if (!updatedTech) {
      return res.status(404).json({ message: "Tech not found" });
    }

    res.status(200).json(updatedTech);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una tecnología por ID
router.delete("/:techId", async (req, res) => {
  try {
    await TechModel.findByIdAndDelete(req.params.techId);
    res.status(200).json({ message: "Tech deleted successfully" });
  } catch (err) {
    console.error("Error deleting tech:", err);
    res.status(500).json({ error: err.message });
  }
});

export { router as techRouter };
