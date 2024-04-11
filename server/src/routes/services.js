import express from "express";
import Service from "../models/Services.js"; // Asegúrate de que la ruta de importación sea correcta

const router = express.Router();

// Obtener todos los servicios
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo servicio
router.post("/", async (req, res) => {
  const service = new Service({
    title: req.body.title,
    icon: req.body.icon,
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener un servicio por ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un servicio por ID
router.patch("/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar un servicio por ID
router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (service) {
      res.json({ message: "Service deleted successfully" });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
