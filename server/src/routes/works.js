import express from "express";
import WorkModel from "../models/Works.js";

const router = express.Router();

// Obtener todos los trabajos
router.get("/", async (req, res) => {
  try {
    const works = await WorkModel.find();
    res.status(200).json(works);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo trabajo
router.post("/", async (req, res) => {
  const work = new WorkModel({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    image: req.body.image,
    source_code_link: req.body.source_code_link,
  });

  try {
    const newWork = await work.save();
    res.status(201).json(newWork);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener un trabajo por ID
router.get("/:id", async (req, res) => {
  try {
    const work = await WorkModel.findById(req.params.id);
    if (work) {
      res.json(work);
    } else {
      res.status(404).json({ message: "Work not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un trabajo por ID
router.patch("/:id", async (req, res) => {
  try {
    const work = await WorkModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (work) {
      res.json(work);
    } else {
      res.status(404).json({ message: "Work not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar un trabajo por ID
router.delete("/:id", async (req, res) => {
  try {
    const work = await WorkModel.findByIdAndDelete(req.params.id);
    if (work) {
      res.json({ message: "Work deleted successfully" });
    } else {
      res.status(404).json({ message: "Work not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router as worksRouter };
