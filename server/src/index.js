import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.js";
import { experiencesRouter } from "./routes/experiences.js";
import { techRouter } from "./routes/tech.js";
import { worksRouter } from "./routes/works.js";
import { feedbacksRouter } from './routes/feedbacks.js';
import servicesRouter from './routes/services.js';

// Cargar variables de entorno
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Endpoint de salud para comprobar que el servidor está funcionando
app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy!");
});

// Uso de routers para diferentes rutas
app.use("/auth", userRouter);
app.use("/services", servicesRouter);
app.use("/experiences", experiencesRouter);
app.use("/tech", techRouter);
app.use("/works", worksRouter);
app.use("/feedbacks", feedbacksRouter);

// Conexión a la base de datos utilizando una variable de entorno
mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(() => console.log("Connected to MongoDB!"))
.catch(err => console.error("Could not connect to MongoDB:", err));

// Iniciar el servidor en el puerto especificado en las variables de entorno
const port = process.env.PORT || 3001; // Usar el puerto 3000 como predeterminado si PORT no está definido
app.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}!`));
