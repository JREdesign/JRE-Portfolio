import express from "express";
import Feedback from "../models/Feedbacks.js"; // Asegúrate de que la ruta de importación sea correcta

const router = express.Router();

// Obtener todos los feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo feedback
router.post("/", async (req, res) => {
  const feedback = new Feedback({
    testimonial: req.body.testimonial,
    name: req.body.name,
    designation: req.body.designation,
    company: req.body.company,
    image: req.body.image,
  });

  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener un feedback por ID
router.get("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (feedback) {
      res.json(feedback);
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un feedback por ID
router.patch("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (feedback) {
      res.json(feedback);
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar un feedback por ID
router.delete("/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (feedback) {
      res.json({ message: "Feedback deleted successfully" });
    } else {
      res.status(404).json({ message: "Feedback not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router as feedbacksRouter };
