import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { experiencesRouter } from "./routes/experiences.js";
import { techRouter } from "./routes/tech.js";
import { worksRouter } from "./routes/works.js";

const app = express();

app.use(express.json());
app.use(cors());



app.use("/auth", userRouter);
app.use("/experiences", experiencesRouter);
app.use("/tech", techRouter);
app.use("/works", worksRouter);

mongoose.connect(
  "mongodb+srv://root:1234567890A@portfoliodb.nb2slxf.mongodb.net/portfoliodb?retryWrites=true&w=majority&appName=portfoliodb"
)
.then(() => console.log("Connected to MongoDB!"))
.catch(err => console.error("Could not connect to MongoDB:", err));


app.listen(3001, () => console.log("SERVER STARTED!"));
